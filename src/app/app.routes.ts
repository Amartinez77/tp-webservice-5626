import { Routes } from '@angular/router';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { CarSpecsComponent } from './pages/car-specs/car-specs.component';
import { ConversorComponent } from './pages/conversor/conversor/conversor.component';
import { GeneradorImgComponent } from './pages/generador-img/generador-img.component';
import { BuscadorCancionesService } from './services/buscador-canciones/buscador-canciones.service';
import { BuscadorComponent } from './pages/buscador/buscador.component';




export const routes: Routes = [
  { path: 'noticias', component: NoticiasComponent, title: 'Noticias' },
  { path: 'car-specs', component: CarSpecsComponent, title: 'Car Specs' },
  { path: 'conversor', component: ConversorComponent, title: 'Conversor Divisas' },
  { path: 'generador', component: GeneradorImgComponent, title: 'Generador de Imagenes' },
  { path:'buscador', component: BuscadorComponent, title: 'Buscador de Canciones' },
  { path: '', redirectTo: 'noticias', pathMatch: 'full' },
  { path: '**', redirectTo: 'noticias' }
  
];
