import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  @Output() emitForm = new EventEmitter<{ email: string; password: string }>();
  form: FormGroup = new FormGroup({});

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
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
      this.emitForm.emit(this.form.value);
    } else {
      this.form.reset();
      this.form.markAllAsTouched();
    }
  }
}
