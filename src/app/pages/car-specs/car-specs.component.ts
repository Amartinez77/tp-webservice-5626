import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import {  CarSpecsService } from '../../services/car-specs/car-specs.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-specs',
  imports: [FormsModule, CommonModule],
  templateUrl: './car-specs.component.html',
  styleUrl: './car-specs.component.css'
})
export class CarSpecsComponent implements OnInit { 

  constructor(private carSpecs: CarSpecsService) { }

  // Array para almacenar la respuesta de la API
  carSpecsResponse: any[] = [];

  // Variable para almacenar el id del auto seleccionado
  selectedCar: number = 0;

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

  // Array para almacenar los modelos de autos
  carSpecsModelResponse: any[] = [];

  // Variable para almacenar el id del auto seleccionado
  selectedCarId: number = 0;

  // Metodo para obtener los modelos de autos
  getCarSpecsModel(id: number) { 
    this.carSpecs.getCarSpecsModel(id).subscribe({
      next: (response) => { 
        this.carSpecsModelResponse = response;
        console.log('Modelos de autos:', this.carSpecsModelResponse);
      },
      error: (error) => { 
        console.error('Error al obtener modelos de autos:', error);
      }
    });
    console.log('Obteniendo modelos de autos...');
  }

  // funcion para obtener el id del auto seleccionado
  getSelectedCarId(id: number) { 
    this.carSpecsModelResponse = [];
    this.selectedCarId = 0;
    this.getCarSpecsModel(id);
  }

}


