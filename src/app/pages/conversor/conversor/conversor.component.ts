import { Component, OnInit } from '@angular/core';
import { ConversorService } from '../../../services/conversor/conversor.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-conversor',
  imports: [CommonModule, FormsModule],
  templateUrl: './conversor.component.html',
  styleUrl: './conversor.component.css'
})
export class ConversorComponent implements OnInit {
  // Definición de variables para recibir los datos del conversor
  monedaBase: string = '';
  monedaDestino: string = '';
  monto: number = 0;
  resultado: number | null = null;

  listadoMonedas: any[] = []; // Variable para almacenar el listado de monedas

  constructor(private conversorService: ConversorService) { }

  ngOnInit(): void {
    // Lógica de inicialización si es necesario
    //this.getConversor(); // Llamar al método para obtener el conversor al iniciar el componente
    this.getMonedas(); // Llamar al método para obtener el listado de monedas al iniciar el componente
  }

  // Método para realizar la conversión
  getConversor() {

    if (this.monedaBase && this.monedaDestino && this.monto > 0) { 

      // Lógica para llamar al servicio de conversor y obtener el resultado
      this.conversorService.getConversor(this.monedaBase, this.monedaDestino, this.monto).subscribe(
        (data: any) => {
          this.resultado = data.result; // Asignar el resultado a la variable resultado
          console.log('Resultado de la conversión:', this.resultado);
        },
        (error: any) => {
          console.error('Error al obtener el conversor:', error);
        }
      );

    }

    
    
  }

  // metodo para obtener el listado de monedas
  getMonedas() {
    this.conversorService.getMonedas().subscribe(
      (data: any) => {
        console.log('Listado de monedas:', data);
        this.convertirListadoMonedas(data); // Convertir el listado de monedas
        console.log('Listado de monedas convertido:', this.listadoMonedas);
      },
      (error: any) => {
        console.error('Error al obtener el listado de monedas:', error);
      }
    );
  }

  //funcion para convertir el objeto que recibe el servicio en un array con el listado de monedas
  convertirListadoMonedas(data: any) {
    this.listadoMonedas = Object.entries(data.currencies).map(([key, value]) => ({
      codigo: key,
      nombre: value
    }));
  }

}
