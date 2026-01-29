import { Routes } from '@angular/router';
import { PropertyListComponent } from './components/property-list/property-list'; 
import { PropertyDetailsComponent } from './components/property-details/property-details';
import { PropertyEditComponent } from './components/property-edit/property-edit';

export const routes: Routes = [
  { path: '', component: PropertyListComponent },
  { path: 'add-property', component: PropertyEditComponent },
  { path: 'property/:id', component: PropertyDetailsComponent },
  { path: '**', redirectTo: '' }
];
