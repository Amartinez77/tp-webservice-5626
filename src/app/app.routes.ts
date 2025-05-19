import { Routes } from '@angular/router';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { CarSpecsComponent } from './pages/car-specs/car-specs.component';


export const routes: Routes = [
  { path: 'noticias', component: NoticiasComponent, title: 'Noticias' },
  {path: 'car-specs', component: CarSpecsComponent, title: 'Car Specs'},
  { path: '', redirectTo: 'noticias', pathMatch: 'full' },
  { path: '**', redirectTo: 'noticias' }
  
];
