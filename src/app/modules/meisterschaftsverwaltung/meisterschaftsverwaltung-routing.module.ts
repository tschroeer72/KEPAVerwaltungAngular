import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeisterschaftsverwaltungComponent } from './containers/meisterschaftsverwaltung/meisterschaftsverwaltung.component';

const routes: Routes = [
  {
    path: '',
    title: 'Meisterschaftsverwaltungverwaltung',
    component: MeisterschaftsverwaltungComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeisterschaftsverwaltungRoutingModule { }
