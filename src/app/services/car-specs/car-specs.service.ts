import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';



// interface que representa la respueste de la api, los id y marcas de los autos
export interface CarSpecsResponse { 
  id: number;
  name: string;
}

// interface que representa la respuesta de la api, los modelos de los autos

export interface CarSpecsModelResponse { 
  id: number;
  name: string;
}


@Injectable({
  providedIn: 'root'
})
export class CarSpecsService {

  // creo una variable para guardar la respuesta de la api en "cache"

  private marcasEnCache: CarSpecsResponse[] | null = null;

  constructor(private http: HttpClient) { }

  // url de la api
  private apiUrl = 'https://car-specs.p.rapidapi.com/v2/cars/makes';

  // metodo para obtener la respuesta de la api

  getCarSpecs(): Observable<CarSpecsResponse[]> { 

    //si la respuesta ya esta en cache, la devolvemos
    if (this.marcasEnCache) { 
      console.log('Devolviendo datos de cache');
      console.log(this.marcasEnCache);
      return of(this.marcasEnCache);
    }

    //headers de la api
    const httpOptions = {
      headers: {
        'x-rapidapi-key': '0d67c15fc8mshf05bd9e4f6655bfp1a0bd6jsn30b062fd0d5c',
        'x-rapidapi-host': 'car-specs.p.rapidapi.com'
      }
    };
    //llamamos a la api y devolvemos la respuesta
    return this.http.get<CarSpecsResponse[]>(this.apiUrl, httpOptions)
      .pipe(tap((data) => this.marcasEnCache = data), // guardamos la respuesta en cache
    
    //si hay un error, devolvemos un array vacio para evitar errores en la aplicacion
        catchError((error) => { 
          console.error('Error al obtener datos de la API:', error);
          return of([]);
        })
  
      );
  }
  

  // metodo para obtener los modelos de los autos
  getCarSpecsModel(id: number): Observable<CarSpecsModelResponse[]> { 
    const apiUrl = `https://car-specs.p.rapidapi.com/v2/cars/makes/${id}/models`;
    const httpOptions = {
      headers: {
        'x-rapidapi-key': '0d67c15fc8mshf05bd9e4f6655bfp1a0bd6jsn30b062fd0d5c',
        'x-rapidapi-host': 'car-specs.p.rapidapi.com'
      }
    };
    return this.http.get<CarSpecsModelResponse[]>(apiUrl, httpOptions)
      .pipe(
        catchError((error) => { 
          console.error('Error al obtener datos de la API:', error);
          return of([]);
        })
      );
  }


}
