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

}
