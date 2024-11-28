import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-email-code',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './email-code.component.html',
  styleUrls: ['./email-code.component.css'] // Sửa lại `styleUrl` thành `styleUrls`
})
export class EmailCodeComponent implements OnInit {
  isSubmitted: boolean = false;
  form;

  constructor(
    public formBuilder: FormBuilder,
    private services: AuthService,
    private router: Router
  ) {
    // Khởi tạo form
    this.form = this.formBuilder.group({
      ConfirmEmail: ['', Validators.required], // Validation cho trường ConfirmEmail
    });
  }
  ngOnInit(): void {
    if (this.services.isLoggedId())
      this.router.navigateByUrl('/dashboard')
  }


  onSubmit() {
    this.isSubmitted = true;

    if (this.form.valid) {
      const confirmCode = this.form.get('ConfirmEmail')?.value?.trim();

      if (!confirmCode) {
        console.error('Confirm Code is required');
        return;
      }

      this.services.confirmEmail(confirmCode).subscribe({
        next: res => {
          console.log('Response:', res);
          if (res.includes('Xac nhan')) {
            console.log('Confirmation successful');
            this.router.navigateByUrl('/user/login');
          } else {
            console.error('Unexpected response:', res);
          }
        },
        error: err => {
          console.error('Error Response:', err);
          if (err.error) {
            console.error('Error Details:', err.error);
          }
        }
      });
    }
  }
  hasDisplayableError(controlName: string): boolean {
    const control = this.form.get(controlName);
    return Boolean(control?.invalid) && (this.isSubmitted || Boolean(control?.touched));
  }
}