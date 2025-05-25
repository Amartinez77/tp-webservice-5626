import { Injectable } from '@angular/core';
import { GoogleGenAI, Modality } from '@google/genai'
import { Observable, from } from 'rxjs';

// interface para la respuesta de la API
export interface ImageGenerationResult {
  imageBase64: string
  text?: string
  fileName: string
}


@Injectable({
  providedIn: 'root'
})
export class GeneradorImgService {

  // variables para conectar con la API de genAI
  private readonly API_KEY = 'AIzaSyBeWupgTrJZBswiHYnilZI3L05T3rqNngU';
  private ai: GoogleGenAI

  // constructor
  constructor() {
    this.ai = new GoogleGenAI({ apiKey: this.API_KEY })
  }

  /**
   * Genera una imagen basada en un título/prompt
   * @param titulo El título o descripción para generar la imagen
   * @returns Observable con el resultado de la generación de imagen
   */
  generarImagen(titulo: string): Observable<ImageGenerationResult> {
    return new Observable(observer => {
      this.generateImageInternal(titulo)
        .then(result => {
          observer.next(result)
          observer.complete()
        })
        .catch(error => {
          observer.error(error)
        })
    })
  }

  private async generateImageInternal(titulo: string): Promise<ImageGenerationResult> {
    try {
      const contents = `Crea una imagen detallada y artística basada en el siguiente título: ${titulo}`

      // Llamada a Gemini con solicitud de imagen + texto
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.0-flash-preview-image-generation',
        contents: contents,
        config: {
          responseModalities: [Modality.TEXT, Modality.IMAGE],
        },
      })

      if (!response.candidates || response.candidates.length === 0) {
        throw new Error('No se recibió respuesta del modelo')
      }

      const candidate = response.candidates[0]
      if (!candidate.content || !candidate.content.parts) {
        throw new Error('Respuesta del modelo inválida')
      }

      const parts = candidate.content.parts
      let imageBase64 = ''
      let textResponse = ''

      for (const part of parts) {
        if (part.text) {
          textResponse = part.text
        } else if (part.inlineData?.data) {
          imageBase64 = part.inlineData.data
        }
      }

      if (!imageBase64) {
        throw new Error('No se generó ninguna imagen')
      }

      const fileName = `gemini-image-${Date.now()}.png`

      return {
        imageBase64,
        text: textResponse,
        fileName,
      }
    } catch (error) {
      console.error('Error generando imagen:', error)
      throw error
    }
  }

  /**
   * Devuelve una URL base64 lista para <img>
   * @param imageBase64 Imagen codificada en base64
   * @returns URL para usar en [src]
   */
  getImageDataUrl(imageBase64: string): string {
    return `data:image/png;base64,${imageBase64}`
  }

}