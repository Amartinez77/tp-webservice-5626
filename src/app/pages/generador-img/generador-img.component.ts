import { Component } from '@angular/core';
import { GeneradorImgService, ImageGenerationResult } from '../../services/generador/generador-img.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-generador-img',
  imports: [CommonModule, FormsModule],
  templateUrl: './generador-img.component.html',
  styleUrl: './generador-img.component.css'
})
export class GeneradorImgComponent {

  // Variables para el formulario
  titulo: string = '';
  contenido: string = '';
  imagenBase64: string | null = null;
  textoRespuesta?: string;
  cargando: boolean = false;
  error?: string;

  // Constructor
  constructor(private generadorImgService: GeneradorImgService) { }

  // Función para generar la imagen
  generarImagen(): void {
    this.error = undefined
    this.imagenBase64 = ''
    this.textoRespuesta = undefined
    this.cargando = true

    this.generadorImgService.generarImagen(this.titulo).subscribe({
      next: (resultado: ImageGenerationResult) => {
        this.imagenBase64 = this.generadorImgService.getImageDataUrl(resultado.imageBase64)
        this.textoRespuesta = resultado.text
        this.cargando = false
      },
      error: (err: any) => {
        console.error('Error al generar imagen:', err)
        this.error = 'Error al generar la imagen. Intenta nuevamente.'
        this.cargando = false
      }
    })
  }

}
