import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import {  CarSpecsService } from '../../services/car-specs/car-specs.service';

@Component({
  selector: 'app-car-specs',
  imports: [],
  templateUrl: './car-specs.component.html',
  styleUrl: './car-specs.component.css'
})
export class CarSpecsComponent implements OnInit { 

  constructor(private carSpecs: CarSpecsService) { }

  // Array para almacenar la respuesta de la API
  carSpecsResponse: any[] = [];

  ngOnInit(): void { 
    this.getCarSpecs();
  }

  getCarSpecs() { 
    this.carSpecs.getCarSpecs().subscribe({
      next: (response) => { 
        this.carSpecsResponse = response;
        console.log('Especificaciones de autos:', this.carSpecsResponse);
      },
      error: (error) => { 
        console.error('Error al obtener especificaciones de autos:', error);
      }
    });
    console.log('Obteniendo especificaciones de autos...');
  }
}


