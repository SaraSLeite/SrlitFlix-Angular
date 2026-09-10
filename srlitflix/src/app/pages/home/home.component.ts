import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MovieApiService } from '../../services/movie-api.service';
import { AutoScrollDirective } from '../../directives/auto-scroll.directive';
import { RouterLink } from '@angular/router';

@Component({

  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AutoScrollDirective, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  constructor(private service: MovieApiService) { }

  bannerResults: any[] = [];
  trendingMovieResults: any[] = [];
  trendingSerieResults: any[] = [];
 recommendedMovieResults: any[] = [];
recommendedSeriesResults: any[] = [];
  ngOnInit(): void {

    this.bannerData();
    this.trendingMovieData();
    this.trendingSerieData();
    this.getUserFavoriteGenres();
    }

  // Consumo do Serviço de Banner
  bannerData() {
    this.service.bannerApiData().subscribe((result) => {
      this.bannerResults = result.results;
    });
  }

  // Filmes em Destaque
  trendingMovieData() {
    this.service.trendingMovieApiData().subscribe((result) => {
      this.trendingMovieResults = result.results;
    })
  }

  // Séries em Destaque
  trendingSerieData() {
    this.service.trendingSerieApiData().subscribe((result) => {
      this.trendingSerieResults = result.results;
    })
  }

  //genero favorito do usuário
  getUserFavoriteGenres(): void {
    const history = JSON.parse(
      localStorage.getItem('history') || '[]'
    );

    if (history.length === 0) {
      console.log('Usuário ainda não possui histórico.');
     return;
    }

    const genreCount: { [key: number]: number } = {};
    history.forEach((item: any) => {
      if (!item.genres) {
        return;
      }

      item.genres.forEach((genre: any) => {
        const genreId = genre.id;
        if (genreCount[genreId]) {
          genreCount[genreId]++;
        } else {
          genreCount[genreId] = 1;
        }
      });
   });

    const favoriteGenres = Object.entries(genreCount)
      .sort((a, b) => Number(b[1]) - Number(a[1]))
      .slice(0, 3)
      .map(([genreId]) => Number(genreId));

    console.log(
      'Gêneros favoritos:',
      favoriteGenres
    );

    favoriteGenres.forEach((genreId) => {
      this.getRecommendedByGenre(genreId);
    });
  }

// Recomendação de filmes por gênero
  getRecommendedByGenre(genreId: number): void {
      // Filmes
  this.service.popularMoviesByGenre(genreId).subscribe((movieResult: { results: any[] }) => {

    const movies = movieResult.results.map((movie: any) => ({
      ...movie,
      media_type: 'movie'
    }));

    this.recommendedMovieResults = [
      ...this.recommendedMovieResults,
      ...movies
    ];
  });

    // Séries
  this.service.popularSeriesByGenre(genreId).subscribe((seriesResult: { results: any[] }) => {

    const series = seriesResult.results.map((serie: any) => ({
      ...serie,
      media_type: 'tv'
    }));

    this.recommendedSeriesResults = [
      ...this.recommendedSeriesResults,
      ...series
    ];
  });
}
}