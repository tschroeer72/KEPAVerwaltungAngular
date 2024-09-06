import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { INavigation } from '../../../core/interfaces/inavigation';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatListModule, RouterModule, MatMenuModule, MatButtonModule, MatIconModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  @Output() sidenavClose = new EventEmitter();
  @Input() navigation!: INavigation[];

  onSidenavClose() {
    this.sidenavClose.emit();
  }
}
