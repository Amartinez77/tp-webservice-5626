import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import {  CarSpecsbyidResponse, CarSpecsModelIdResponse, CarSpecsModelResponse, CarSpecsResponse, CarSpecsService, CarSpecsTrimIdResponse } from '../../services/car-specs/car-specs.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

declare var bootstrap: any; // Declarar la variable bootstrap para evitar errores de compilación
@Component({
  selector: 'app-car-specs',
  imports: [FormsModule, CommonModule],
  templateUrl: './car-specs.component.html',
  styleUrl: './car-specs.component.css'
})
export class CarSpecsComponent implements OnInit { 

  constructor(private carSpecs: CarSpecsService) { }

  

  ngOnInit(): void { 
    this.getCarSpecs();
  }

  // Array para almacenar la respuesta de la API
  carSpecsResponse: CarSpecsResponse[] = [];

  // Array para almacenar los modelos de autos
  carSpecsModelResponse: CarSpecsModelResponse[] = [];

  // Array para almacenar la serie de autos
  carSpecsModelIdResponse: CarSpecsModelIdResponse[] = [];

  // Array para almacenar el id trim de la serie de autos
  carSpecsTrimIdResponse: CarSpecsTrimIdResponse[] = [];

  // Array para almacenar las especificaciones de autos
  carSpecsbyidResponse: CarSpecsbyidResponse | null = null;

  // Variable para almacenar el id de la marca seleccionada
  selectedCar: number = 0;
  
  // Variable para almacenar el id del modelo de auto seleccionado
  selectedCarId: number = 0;

  // Variable para almacenar el id de la serie seleccionada
  selectedCarTrim: number = 0;
  selectedCarGenerationId: number = 0;

  // Variable para almacenar el id trim de la serie seleccionada
  selectedCarTrimId: number = 0;
  
  // Variable para almacenar el id del modelo especifico y obtener las especificaciones
  selectedCarModel: number = 0;

    // metodo para obtener las marcas de autos
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
  
  // funcion para obtener el id de la marca del auto seleccionado desde el html
  getSelectedCarId(id: number) { 
    this.selectedCar = id;
    this.selectedCarId = 0;
    this.selectedCarTrim = 0;
    this.selectedCarGenerationId = 0;
    this.carSpecsModelResponse = [];
    this.carSpecsModelIdResponse = [];
    this.carSpecsTrimIdResponse = [];
    this.getCarSpecsModel(id);
    console.log('Marca seleccionada:', id);
  }

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
  // funcion para obtener el id del modelo de auto seleccionado desde el html
  getSelectedCarModelId(id: number) { 
    this.carSpecsModelIdResponse = [];
    this.selectedCarModel = 0;
    this.getCarSpecsModelId(id);
    console.log('modelo seleccionado:', id);
  }
  

  // metodo para obtener el id de la generacion del auto 
  getCarSpecsModelId(id: number) { 
    this.selectedCarId = id;
    this.selectedCarTrim = 0;
    this.selectedCarGenerationId = 0;
    this.carSpecsModelIdResponse = [];
    this.carSpecsTrimIdResponse = [];


    this.carSpecs.getCarSpecsModelId(id).subscribe({
      next: (response) => { 
        this.carSpecsModelIdResponse = response;
        console.log('Serie de autos:', response);
      },
      error: (error) => { 
        console.error('Error al obtener serie de autos:', error);
      }
    });
    console.log('Obteniendo serie de autos...');
  }

    // funcion para obtener el id trim de la generacion seleccionada desde el html
    getSelectedCarTrimId(id: number) { 
      this.carSpecsTrimIdResponse = [];
      this.selectedCarTrimId = 0;
      this.getCarSpecsTrimId(id);
      console.log('serie seleccionada:', id);
    }
  

  // metodo para obtener el id trim de la serie seleccionada
  getCarSpecsTrimId(id: number) { 

    this.selectedCarTrim = id;
    this.selectedCarGenerationId = 0;
    this.carSpecsTrimIdResponse = [];

    this.carSpecs.getCarSpecsTrimId(id).subscribe({
      next: (response) => { 
        this.carSpecsTrimIdResponse = response;
        console.log('Id trim de la serie:', response);
      },
      error: (error) => { 
        console.error('Error al obtener id trim de la serie:', error);
      }
    });
    console.log('Obteniendo id trim de la serie...');
  }

  // funcion para obtener el id trim del auto especifico seleccionado desde el html
  getSelectedCarTrim(id: number) { 
    //this.carSpecsbyidResponse = null;
    //this.selectedCarTrim = 0;
    //this.getCarSpecsById(id);
    this.selectedCarGenerationId = id;
    console.log('generacion seleccionada:', id);
  }


  // metodo para obtener las especificaciones del auto segun el id
  getCarSpecsById(id: number) { 
    this.carSpecs.getCarSpecsbyid(id).subscribe({
      next: (response) => { 
        this.carSpecsbyidResponse = response || null;
        console.log('Especificaciones de autos en el metodo getCarSpecsById:', response);
        console.log('Especificaciones de autos:', response);

        //abrir el modal manualmente despues de obtener la respuesta
        const modal = new bootstrap.Modal(document.getElementById('especificacionesModal')!);
        modal.show();

      },
      error: (error) => { 
        console.error('Error al obtener especificaciones de autos:', error);
      }
    });
    
  }


}


