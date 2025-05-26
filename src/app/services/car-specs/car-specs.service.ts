import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environments';



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

// interface que representa la respuesta de la api, las generaciones de los autos
export interface CarSpecsModelIdResponse { 
  id: number;
  name: string;
  generation: string;
  trim: string;
}

// interface que representa la respuesta de la api, los id trim de los autos
export interface CarSpecsTrimIdResponse { 
  id: number;
  series: string;
}

// interface que representa la respuesta de la api, las especificaciones de los autos
export interface CarSpecsbyidResponse { 
  id: number;
  make: string;
  model: string;
  generation: string;
  series: string;
  trim: string;
  bodyType: string;
  loadHeightMm: number;
  numberOfSeats: number;
  lengthMm: number;
  widthMm: number;
  heightMm: number;
  wheelSizeR14: number;
  fullWeightKg: number;
  maximumTorqueNM: number;
  injectionType: string;
  cylinderLayout: string;
  numberOfCylinders: number;
  engineType: string;
  boostType: string;
  enginePlacement: string;
  maxPowerKw: number;
  engineHp: number;
  transmission: string;
  cityFuelPer100KmL: number;
  mixedFuelConsumptionPer100KmL: number;
  highwayFuelPer100KmL: number;
  fuelTankCapacityL: number;
  acceleration0To100KmPerHS: number;
  maxSpeedKmPerH: number;
  countryOfOrigin: string;
  numberOfDoors: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarSpecsService {

  

  // creo una variable para guardar la respuesta de la api en "cache"
  private marcasEnCache: CarSpecsResponse[] | null = null;
  private marcasModelEnCache: CarSpecsModelResponse[] | null = null;
  private marcasModelIdEnCache: CarSpecsModelIdResponse[] | null = null;
  private marcasTrimIdEnCache: CarSpecsTrimIdResponse[] | null = null;
  private especificacionesEnCache: CarSpecsbyidResponse | null = null;

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
        'x-rapidapi-key': environment.carSpecsApiKey,
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

    //si la respuesta ya esta en cache, la devolvemos
    if (this.marcasModelEnCache) { 
      console.log('Devolviendo datos de cache');
      console.log(this.marcasModelEnCache);
      return of(this.marcasModelEnCache);
    }


    const apiUrl = `https://car-specs.p.rapidapi.com/v2/cars/makes/${id}/models`;
    const httpOptions = {
      headers: {
        'x-rapidapi-key':environment.carSpecsApiKey,
        'x-rapidapi-host': 'car-specs.p.rapidapi.com'
      }
    };
    return this.http.get<CarSpecsModelResponse[]>(apiUrl, httpOptions)
      .pipe(tap((data) => this.marcasModelEnCache = data), // guardamos la respuesta en cache
        
        //si hay un error, devolvemos un array vacio para evitar errores en la aplicacion
        catchError((error) => { 
          console.error('Error al obtener datos de la API:', error);
          return of([]);
        })
      );
  }

  // metodo para obtener la serie segun el id de modelo del auto
  getCarSpecsModelId(id: number): Observable<CarSpecsModelIdResponse[]> { 
    //si la respuesta ya esta en cache, la devolvemos
    if (this.marcasModelIdEnCache) { 
      console.log('Devolviendo datos de cache');
      console.log(this.marcasModelIdEnCache);
      return of(this.marcasModelIdEnCache);
    }

    const apiUrl = `https://car-specs.p.rapidapi.com/v2/cars/models/${id}/generations`;
    const httpOptions = {
      headers: {
        'x-rapidapi-key': environment.carSpecsApiKey,
        'x-rapidapi-host': 'car-specs.p.rapidapi.com'
      }
    };
    return this.http.get<CarSpecsModelIdResponse[]>(apiUrl, httpOptions)
      .pipe(
        catchError((error) => { 
          console.error('Error al obtener datos de la API:', error);
          return of([]);
        })
      );
  }

  // metodo para obtener en base al id de la serie el id trim
  getCarSpecsTrimId(id: number): Observable<CarSpecsTrimIdResponse[]> { 
    //si la respuesta ya esta en cache, la devolvemos
    if (this.marcasTrimIdEnCache) { 
      console.log('Devolviendo datos de cache');
      console.log(this.marcasTrimIdEnCache);
      return of(this.marcasTrimIdEnCache);
    }

    const apiUrl = `https://car-specs.p.rapidapi.com/v2/cars/generations/${id}/trims`;
    const httpOptions = {
      headers: {
        'x-rapidapi-key': environment.carSpecsApiKey,
        'x-rapidapi-host': 'car-specs.p.rapidapi.com'
      }
    };
    return this.http.get<CarSpecsTrimIdResponse[]>(apiUrl, httpOptions)
      .pipe(
        tap((data) => this.marcasTrimIdEnCache = data), // guardamos la respuesta en cache
        catchError((error) => { 
          console.error('Error al obtener datos de la API:', error);
          return of([]);
        })
      );
  }




  // metodo para obtener las especificaciones del auto segun el id trim
  getCarSpecsbyid(id: number): Observable<CarSpecsbyidResponse | null> { 
    //si la respuesta ya esta en cache, la devolvemos
    if (this.especificacionesEnCache) { 
      console.log('Devolviendo datos de cache');
      console.log(this.especificacionesEnCache);
      return of(this.especificacionesEnCache);
    }

    const apiUrl = `https://car-specs.p.rapidapi.com/v2/cars/trims/${id}`;
    const httpOptions = {
      headers: {
        'x-rapidapi-key': environment.carSpecsApiKey,
        'x-rapidapi-host': 'car-specs.p.rapidapi.com'
      }
    };
    return this.http.get<CarSpecsbyidResponse>(apiUrl, httpOptions)
      .pipe(
        tap((data) => this.especificacionesEnCache = data), // guardamos la respuesta en cache
        catchError((error) => { 
          console.error('Error al obtener datos de la API:', error);
          return of(null);
        })
      );
  }

}
