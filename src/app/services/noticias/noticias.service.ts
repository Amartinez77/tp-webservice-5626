import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

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
        'x-rapidapi-key': '0d67c15fc8mshf05bd9e4f6655bfp1a0bd6jsn30b062fd0d5c',
        'x-rapidapi-host': 'google-news22.p.rapidapi.com'
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
