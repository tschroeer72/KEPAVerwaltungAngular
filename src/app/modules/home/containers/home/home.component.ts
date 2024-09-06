import { Component } from '@angular/core';
import { LoginComponent } from '../../components/login/login.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  login(input: { email: string; password: string }) {
    console.log('FROM HOME CONTAINER', input);
  }
}
