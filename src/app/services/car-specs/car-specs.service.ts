import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



// interface que representa la respueste de la api
export interface CarSpecsResponse { 
  id: number;
  name: string;
}


@Injectable({
  providedIn: 'root'
})
export class CarSpecsService {

  constructor(private http: HttpClient) { }

  // url de la api
  private apiUrl = 'https://car-specs.p.rapidapi.com/v2/cars/makes';

  // metodo para obtener la respuesta de la api

  getCarSpecs(): Observable<CarSpecsResponse[]> { 
    //headers de la api
    const httpOptions = {
      headers: {
        'x-rapidapi-key': '0d67c15fc8mshf05bd9e4f6655bfp1a0bd6jsn30b062fd0d5c',
        'x-rapidapi-host': 'car-specs.p.rapidapi.com'
      }
    };
    //llamamos a la api y devolvemos la respuesta
    return this.http.get<CarSpecsResponse[]>(this.apiUrl, httpOptions);
  }


}
