import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { API_URL } from '@core/env.token';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  template: `
    <form *ngIf="loginForm" [formGroup]="loginForm">
      <h1>{{ title }}</h1>
      <input placeholder="johny75" formControlName="password" />
      <br />
      <input placeholder="******" type="password" formControlName="username" />
    </form>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  http = inject(HttpClient);
  API_URL = inject(API_URL);
  fb = inject(NonNullableFormBuilder);
  cdr = inject(ChangeDetectorRef);

  loginForm!: FormGroup<{
    username: FormControl<string>;
    password: FormControl<string>;
  }>;

  title = '';

  ngOnInit() {
    this.http.get<{ title: string }>(this.API_URL + '/data').subscribe(data => {
      this.title = data.title;
      this.loginForm = this.createForm();
      this.cdr.detectChanges();
    });
  }

  createForm(): FormGroup<{
    username: FormControl<string>;
    password: FormControl<string>;
  }> {
    return this.fb.group({
      password: this.fb.control(''),
      username: this.fb.control(''),
    });
  }
}
