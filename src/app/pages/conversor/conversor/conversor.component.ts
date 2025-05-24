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
  // Definición de variables
  monedaBase: string = 'USD';
  monedaDestino: string = 'ARS';
  monto: number = 100;
  resultado: number | null = null;

  constructor(private conversorService: ConversorService) { }

  ngOnInit(): void {
    // Lógica de inicialización si es necesario
    this.getConversor(); // Llamar al método para obtener el conversor al iniciar el componente
  }

  // Método para realizar la conversión
  getConversor() {
    // Lógica para llamar al servicio de conversor y obtener el resultado
    this.conversorService.getConversor().subscribe(
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
