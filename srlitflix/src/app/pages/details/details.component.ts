import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MovieApiService } from '../../services/movie-api.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  constructor(
    private service: MovieApiService,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}
  media: any;
  trailers: any = [];
  cast: any = [];

  //favoritos
  isFavorite = false;
  favorites: any[] = [];

  recommendedResults: any[] = [];

  ngOnInit(): void {
    let id = this.router.snapshot.paramMap.get('id');
    let type = this.router.snapshot.paramMap.get('type');

    this.loadFavorites();
    this.getMedia(type, id);
  
    this.loadRecommendations();
  }

  getMedia(type: any, id: any) {

    this.service.mediaDetails(type, id).subscribe((result) => {
      this.media = result;
      this.saveToHistory(result, type);
      this.checkFavorite();
    });

    this.service.mediaTrailers(type, id).subscribe((result) => {
      this.trailers = result.results;
    });

    this.service.mediaCast(type, id).subscribe((result) => {
      this.cast = result.cast;
    });
  }

  loadFavorites(): void {

    this.favorites = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    );
  }

  // Verifica se o item é serie ou filme.
  checkFavorite(): void {

    if (!this.media) return;

    const type = this.router.snapshot.paramMap.get('type');

    this.isFavorite = this.favorites.some(
      item =>
        item.id === this.media.id &&
        item.media_type === type
    );
  }

  // add or remove from favorites
  toggleFavorite(): void {

    if (!this.media) return;

    const type = this.router.snapshot.paramMap.get('type');

    const favorite = {
      id: this.media.id,
      title: this.media.title || this.media.name,
      media_type: type,
      genres: this.media.genres
    };

    const index = this.favorites.findIndex(
      item =>
        item.id === favorite.id &&
        item.media_type === favorite.media_type
    );

    if (index === -1) {
      this.favorites.push(favorite);
      this.isFavorite = true;

    } else {

      this.favorites.splice(index, 1);
      this.isFavorite = false;
    }

    localStorage.setItem(
      'favorites',
      JSON.stringify(this.favorites)
    );
  }

  getSafeUrl(key: string): SafeResourceUrl {

    return this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' + key
    );
  }
  saveToHistory(media: any, type: string) {

    const history = JSON.parse(
      localStorage.getItem('history') || '[]'
    );
    history.push({
      id: media.id,
      title: media.title || media.name,
      media_type: type,
      genres: media.genres
    });
    localStorage.setItem(
      'history',
      JSON.stringify(history)
    );
  }

loadRecommendations(): void {

  const history = JSON.parse(
    localStorage.getItem('history') || '[]'
  );

  const recommendations$ = this.service.recommendationsByHistory(history) as any;

  if (recommendations$ && typeof recommendations$.subscribe === 'function') {
    recommendations$.subscribe((result: any[]) => {
      const currentId = Number(
        this.router.snapshot.paramMap.get('id')
      );

      const currentType =
        this.router.snapshot.paramMap.get('type');

      this.recommendedResults = result.filter(
        item =>
          !(
            item.id === currentId &&
            item.media_type === currentType
          )
      );
    });
  }
}}