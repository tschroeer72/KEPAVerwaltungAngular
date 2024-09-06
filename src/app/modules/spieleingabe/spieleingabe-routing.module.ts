import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpieleingabeComponent } from './containers/spieleingabe/spieleingabe.component';

const routes: Routes = [
  {
    path: '',
    title: 'Spieleingabe',
    component: SpieleingabeComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpieleingabeRoutingModule { }
