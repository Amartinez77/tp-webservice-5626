import { Component, OnInit } from '@angular/core';
import { Noticia, NoticiasService } from '../../services/noticias/noticias.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-noticias',
  imports: [CommonModule],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css'
})
export class NoticiasComponent implements OnInit {


  constructor(private noticiasService: NoticiasService) { }

  // Propiedad para almacenar las noticias
  noticias: Noticia[] = [];
  noticiaDestacada?: Noticia; // Noticia destacada
  
  ngOnInit(): void {    
    // Llamar al método para obtener las noticias
    this.getNoticias();
    this.noticiasService.getNoticias().subscribe(
      noticias => {
        console.log('Noticias en el componente:', noticias);
        this.noticias = noticias;
      },
      error => console.error('Error al obtener noticias:', error)
    );
  }

  // Método para obtener las noticias
  /* getNoticias() {
    this.noticiasService.getNoticias().subscribe((data: any) => {
      this.noticias = data;
      console.log(this.noticias);
    });
  } */
  
  getNoticias() { 
    this.noticiasService.getNoticias().subscribe({
      next: (noticias) => { 
        if (noticias.length > 0) { 
          this.noticiaDestacada = noticias[0];
          this.noticias = noticias.slice(1); // Excluye la noticia destacada del resto
        }
      },
      error: (error) => { 
        console.error('Error al obtener noticias:', error);
      }
    })
  }


}
