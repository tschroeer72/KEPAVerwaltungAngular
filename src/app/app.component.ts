import { Component, HostBinding, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from './modules/layout/header/header.component';
import { FooterComponent } from './modules/layout/footer/footer.component';
import { SidenavComponent } from './modules/layout/sidenav/sidenav.component';
import { INavigation } from './core/interfaces/inavigation';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    SidenavComponent,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Kegelgruppe KEPA 1958 Verwaltung';
  isDarkMode = false;

  navigation: INavigation[] = [
    { name: 'Home', link: '/home', icon: 'home' },
    { name: 'Mitgliederverwaltung', link: '/mitglieder', icon: 'manage_accounts' },
    { name: 'Meisterschaftsverwaltung', link: '/meisterschaft', icon: 'bookmark_manager' },
    { name: 'Spieleingabe', link: '/spieleingabe', icon: 'edit_square' },
    { name: 'Spielergebnisse', link: '/spielergebnisse', icon: 'functions' },
    { name: 'About', link: '/about', icon:'home' },
  ];

  @HostBinding('class')
  get themeMode() {
    return this.isDarkMode ? 'theme-dark' : 'theme-light';
  }

  ngOnInit() {
    //console.log('AppComponent initialized');
    //console.log('navigation:', this.navigation);
  }

  changeTheme() {
    this.isDarkMode = !this.isDarkMode;
  }
}
