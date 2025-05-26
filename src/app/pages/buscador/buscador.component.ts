import { Component } from '@angular/core';
import { BuscadorCancionesService, MusicTrack } from '../../services/buscador-canciones/buscador-canciones.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buscador',
  imports: [CommonModule, FormsModule],
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.css'
})
export class BuscadorComponent {
  query = '';
  resultado: MusicTrack | null = null;
  cargando = false;

  constructor(private buscadorCancionesService: BuscadorCancionesService) { }

  buscar() {
    if (!this.query) return;
    this.cargando = true;
    this.resultado = null;

    this.buscadorCancionesService.buscarCancion(this.query).subscribe({
      next: (track) => {
        this.resultado = track;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error:', err);
        this.cargando = false;
      },
    });
  }

}
