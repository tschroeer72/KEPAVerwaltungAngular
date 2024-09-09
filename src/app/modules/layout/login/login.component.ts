import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BackendService } from '../../../services/backend.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  @Output() emitForm = new EventEmitter<{ username: string; password: string }>();
  form: FormGroup = new FormGroup({});
  login$ = new Subscription();

  constructor(private backendService: BackendService) {
      
  }

  ngOnDestroy(): void {
    //console.log('OnDestroy');
    this.login$.unsubscribe();
  }

  ngOnInit() {
    //console.log('OnInit');
    this.createForm();
  }

  private createForm() {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]), //, Validators.email
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/),
        Validators.minLength(6),
        Validators.maxLength(255),
      ]),
    });
  }

  submitForm() {
    if (this.form.valid) {
      //this.emitForm.emit(this.form.value);
      this.login$ = this.backendService.login(this.form.value.username, this.form.value.password).subscribe(
        (tk) => {
          localStorage.setItem('currentUser', this.form.value.username);
          localStorage.setItem('token', tk.token)
  
        }
      );
    } else {
      this.form.reset();
      this.form.markAllAsTouched();
    }
  }
}
