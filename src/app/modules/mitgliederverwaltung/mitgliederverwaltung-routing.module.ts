import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MitgliederverwaltungComponent } from './containers/mitgliederverwaltung/mitgliederverwaltung.component';

const routes: Routes = [
  {
    path: '',
    title: 'Mitgliederverwaltung',
    component: MitgliederverwaltungComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MitgliederverwaltungRoutingModule { }
