import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

//interfaz para la respuesta de la API deezer
export interface MusicTrack {
  title: string;
  artist: string;
  album: string;
  previewUrl: string;
  coverImage: string;
}

@Injectable({
  providedIn: 'root'
})
export class BuscadorCancionesService {

  private readonly API_URL = 'https://api.deezer.com/search?q=';

  constructor(private http: HttpClient) { }

  buscarCancion(query: string): Observable<MusicTrack> {
    return this.http
      .get<any>(`https://corsproxy.io/?${encodeURIComponent(this.API_URL + query)}`)
      .pipe(
        map(res => {
          const first = res.data[0];
          return {
            title: first.title,
            artist: first.artist.name,
            album: first.album.title,
            previewUrl: first.preview,
            coverImage: first.album.cover_medium,
          } as MusicTrack;
        })
      );
  }
}
