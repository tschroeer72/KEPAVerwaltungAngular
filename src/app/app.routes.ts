import { Routes } from '@angular/router';
import { LoginComponent } from './modules/layout/login/login.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: 'mitglieder',
    pathMatch: 'full',
    loadChildren: () =>
      import('./modules/mitgliederverwaltung/mitgliederverwaltung.module').then((m) => m.MitgliederverwaltungModule),
  },
  {
    path: 'meisterschaft',
    pathMatch: 'full',
    loadChildren: () =>
      import('./modules/meisterschaftsverwaltung/meisterschaftsverwaltung.module').then((m) => m.MeisterschaftsverwaltungModule),
  },
  {
    path: 'spieleingabe',
    pathMatch: 'full',
    loadChildren: () =>
      import('./modules/spieleingabe/spieleingabe.module').then((m) => m.SpieleingabeModule),
  },
  {
    path: 'spielergebnisse',
    pathMatch: 'full',
    loadChildren: () =>
      import('./modules/spielergebnisse/spielergebnisse.module').then((m) => m.SpielergebnisseModule),
  },
  {
    path: 'about',
    pathMatch: 'full',
    loadChildren: () =>
      import('./modules/about/about.module').then((m) => m.AboutModule),
  },
  { path: '**', redirectTo: '' },
];
