import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MovieApiService } from '../../services/movie-api.service';
import { AutoScrollDirective } from '../../directives/auto-scroll.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,AutoScrollDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private service: MovieApiService){}

  bannerResults: any = [];
  trendingMovieResults: any = [];
  trendingSerieResults: any = [];
  popularActionMovieResults: any = [];
  popularTerrorMovieResults: any = [];
  
  ngOnInit(): void {
    this.bannerData();
    this.trendingMovieData();
    this.trendingSerieData();
    this.popularActionMovieData(); 
    this.popularTerrorMovieData(); 

  }

  // Consumo do Serviço de Banner
  bannerData() {
    this.service.bannerApiData().subscribe((result) => {
      //console.log(result)
      this.bannerResults = result.results;      
    })

  }

  //Filmes em Destaque
  trendingMovieData(){
    this.service.trendingMovieApiData().subscribe((result) =>{
      this.trendingMovieResults = result.results;
    })
  }

  // Series em Destaque
  trendingSerieData(){
    this.service.trendingSerieApiData().subscribe((result) =>{
      this.trendingSerieResults = result.results;
    })
  }
  
  // Filmes Populares 
  popularActionMovieData(){
    this.service.popularActionMovieApiData().subscribe((result) => {
      this.popularActionMovieResults = result.results;
    })
  }
  popularTerrorMovieData(){
    this.service.popularTerrorMovieApiData().subscribe((result) => {
      this.popularTerrorMovieResults = result.results;
    })
  }


}
