import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {
  recommendationsByHistory(history: any) {
    throw new Error('Method not implemented.');
  }
  popularHorrorSerieData() {
    throw new Error('Method not implemented.');
  }

  baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) { }
  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMWVkMTFlMDBlMTk1NzRmY2RjNzYzN2M3N2IxYjFkZSIsIm5iZiI6MTc0Njc0OTk4NC4yNDg5OTk4LCJzdWIiOiI2ODFkNGEyMDE4MTRmN2Q4MTZjMWUwMjMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.JTANee0ldumFS5owbnAdEi0Py0mnTL6_MckbUXuk0YM'
    }
  };

  // Banner de Midias da Semana
  bannerApiData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/trending/all/week?language=pt-br`, this.options);
  }

  // Filmes em Destaque do Dia
  trendingMovieApiData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/trending/movie/day?language=pt-br`, this.options)
  }

  // Séries em Destaque do Dia
  trendingSerieApiData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/trending/tv/day?language=pt-br`, this.options)
  }

  // Séries de Terror mais Populares
popularHorrorSerieApiData(): Observable<any> {
  return this.http.get(
    `${this.baseUrl}/discover/tv?language=pt-br&with_genres=27&sort_by=popularity.desc`,
    this.options
  );
}

// Filmes por gênero
popularMoviesByGenre(genreId: number): Observable<any> {
  return this.http.get(
    `${this.baseUrl}/discover/movie?language=pt-br&with_genres=${genreId}&sort_by=popularity.desc`,
    this.options
  );
}

// Séries por gênero
popularSeriesByGenre(genreId: number): Observable<any> {
  return this.http.get(
    `${this.baseUrl}/discover/tv?language=pt-br&with_genres=${genreId}&sort_by=popularity.desc`,
    this.options
  );
}

  // Detalhes do Filme ou Série
  mediaDetails(type: any, value: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${type}/${value}?language=pt-br`, this.options)
  }

  // Trailers do Filme ou Série
  mediaTrailers(type: any, value: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${type}/${value}/videos?language=pt-br`, this.options)
  }

  // Elenco do Filme ou Série
  mediaCast(type: any, value: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${type}/${value}/credits?language=pt-br`, this.options)
  }

  // Buscar um ator ou atriz
  personDetails(value: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/person/${value}?language=pt-br`, this.options)
  }

  // Pesquisar
  searchMedia(value: any, page: any = 1) : Observable<any> {
    return this.http.get(`${this.baseUrl}/search/multi?query=${value}&language=pt-br&include_adult=false&page=${page}`, this.options);
  }

}