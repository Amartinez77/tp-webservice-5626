import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConversorService  {

  constructor(private http: HttpClient) { }

  // conversor de divisas

  // objeto para la respuesta de la API
  respuesta: any = null;

  // variables para la API de conversor de divisas
  private apiUrl = 'https://api.apilayer.com/currency_data/convert'; // URL de la API de conversor de divisas
  private apiKey = 'E5HUZOGv0tUoUiHgsYiLaTuiKyNA0d34'; // Clave de la API de conversor de divisas
  private monedaBase = 'USD'; // Moneda base para la conversión
  private monedaDestino = 'ARS'; // Moneda destino para la conversión
  private monto = 100; // Cantidad a convertir

  // metodo para comunicarse con la API de conversor de divisas

  getConversor(): Observable<any> { 
    // contruir la URL de la API con los parámetros necesarios
    const url = `${this.apiUrl}?to=${this.monedaDestino}&from=${this.monedaBase}&amount=${this.monto}`;

    //headers
    const httpOptions = {
      headers: {
        'apikey': this.apiKey,
      }
        
    };

    // llamar a la API y devolver el resultado
    return this.http.get<any>(url, httpOptions)
    .pipe(
      tap((data) => { 
        this.respuesta = data; // guardar la respuesta en la variable respuesta
        console.log('Respuesta de la API:', this.respuesta); // imprimir la respuesta en la consola
      }),
      catchError((error) => { // manejar errores
        console.error('Error al obtener datos de la API:', error);
        return of(null); // devolver null en caso de error
      })
    );

  }

}
