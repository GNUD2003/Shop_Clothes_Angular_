import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router, RouterLink } from '@angular/router';
//import { Router } from 'express';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  form
  isSubmitted: boolean = false;

  constructor(public formBuilder: FormBuilder, private services: AuthService, private router: Router) {

    this.form = this.formBuilder.group({
      UserName: ['', Validators.required],
      Password: ['', Validators.required],
      FullName: ['', Validators.required],
      DateOfBirth: ['', Validators.required],
      PhoneNumber: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
    });
  }
  ngOnInit(): void {
    if (this.services.isLoggedId())
      this.router.navigateByUrl('/dashboard')
  }

  onSunmit() {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.services.createUser(this.form.value).subscribe({
        next: res => {
          // console.log(res);
          this.router.navigateByUrl('/user/confirmEmail');
        },
        error: err => console.log('error', err)
      })

        ;
    }
  }
  hasDisplayableError(controlName: string): Boolean {
    const control = this.form.get(controlName);
    return Boolean(control?.invalid) && (this.isSubmitted || Boolean(control?.touched))
  }
}
