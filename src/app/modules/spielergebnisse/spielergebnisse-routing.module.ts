import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpielergebnisseComponent } from './containers/spielergebnisse/spielergebnisse.component';

const routes: Routes = [
  {
    path: '',
    title: 'Spielergebnisse',
    component: SpielergebnisseComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpielergebnisseRoutingModule { }
