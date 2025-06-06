import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {

  constructor(private http: HttpClient) { }

  baseUrl = "https://api.themoviedb.org/3";
  options = {
    method: 'GET',
    headers: {
      accept: 'aplication/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTgzNGY1YjJhNTJkZGIyMmM4MjYwNDRlOTVlMGFmYyIsIm5iZiI6MTc0NzI2NTAzMS40NjMsInN1YiI6IjY4MjUyNjA3YzJkNDA4M2U5MDJkMjczMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.X6s4IJ-Q8G9cgRSfT9fEk7-Cx6HZ5lg7gfHdKJfTlNc'
    }
  }

  // Banner de Midias da Semana 
  bannerApiData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/trending/all/week?language=pt-br`, this.options);
  }

  // Filmes em destaque do Dia 
  trendingMovieApiData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/trending/movie/day?language=pt-br`, this.options)
  }

  // Series em destaque do Dia 
  trendingSerieApiData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/trending/tv/day?language=pt-br`, this.options)
  }

  // Filmes de Ação mais populares
  popularActionMovieApiData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/discover/movie?language=pt-br&with_genres=27&sort_by=popularity.desc`, this.options)
  }

  // Detalhes do Filme ou Série
  mediaDetails(type: any, value: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${type}/${value}?language=pt-br`, this.options);
  }

  // Trailers do Filme ou Série
  mediaTrailers(type: any, value: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${type}/${value}/videos?language=pt-br`, this.options);
  }

  
   // Elenco do Filme ou Série
   mediaCast(type: any, value: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${type}/${value}/credits?language=pt-br`, this.options);
  }

}