import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environments';


// interface para recibir la respuesta de la API
export interface ApiRespuesta { 
  success: boolean;
  total: number;
  data: any[];
}

// interface para el modelo de noticia
export interface Noticia { 
  title: string;
  url: string;
  date: string;
  thumbnail: string;
  description: string;
  source: {
    name: string;
    url: string;
    favicon: string;
  };
  keywords: string[];
  authors: string[];
}


@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://google-news22.p.rapidapi.com/v1/geolocation?country=ar&language=es&location=bsas';

  // Método para obtener las noticias
  getNoticias(): Observable<Noticia[]> {
    // Llamar a la API y devolver el resultado
    const httpOptions = {
      headers: {
        'x-rapidapi-key': environment.GoogleNoticiasApiKey,
        'x-rapidapi-host': environment.GoogleNoticiasApiHost,
      }
    };

    return this.http.get<ApiRespuesta>(this.apiUrl, httpOptions).pipe(
      map((response: ApiRespuesta) => {
        console.log('Respuesta de la API:', response);
        return response.data;
      })
    );
    
  }
}
