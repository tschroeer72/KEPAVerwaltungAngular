import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, MatIconModule, MatToolbarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  title: string = 'Kegelgruppe KEPA 1958 Verwaltung';

  @Output() sidenavToggle = new EventEmitter();
  @Output() changeTheme = new EventEmitter();

  @Input() isDarkMode = false;

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  switchTheme() {
    this.changeTheme.emit();
  }
}
