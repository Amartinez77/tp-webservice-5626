import { Routes } from '@angular/router';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { CarSpecsComponent } from './pages/car-specs/car-specs.component';
import { ConversorComponent } from './pages/conversor/conversor/conversor.component';



export const routes: Routes = [
  { path: 'noticias', component: NoticiasComponent, title: 'Noticias' },
  { path: 'car-specs', component: CarSpecsComponent, title: 'Car Specs' },
  { path: 'conversor', component: ConversorComponent, title: 'Conversor Divisas' },
  { path: '', redirectTo: 'noticias', pathMatch: 'full' },
  { path: '**', redirectTo: 'noticias' }
  
];
