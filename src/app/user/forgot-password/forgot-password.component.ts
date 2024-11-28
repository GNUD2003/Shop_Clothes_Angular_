import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit {
  isSubmitted: boolean = false;
  form;

  constructor(
    public formBuilder: FormBuilder,
    private services: AuthService,
    private router: Router
  ) {
    // Khởi tạo form
    this.form = this.formBuilder.group({
      forgotPassword: ['', Validators.required], // Validation cho trường ConfirmEmail
    });
  }
  ngOnInit(): void {
    if (this.services.isLoggedId())
      this.router.navigateByUrl('/user/updatePassword')
  }


  onSubmit() {
    this.isSubmitted = true;

    if (this.form.valid) {
      const forgotPassword = this.form.get('forgotPassword')?.value?.trim();

      if (!forgotPassword) {
        console.error('Confirm Code is required');
        return;
      }

      this.services.forgotPassword(forgotPassword).subscribe({
        next: (res: string) => {
          console.log('Response:', res);

          // Kiểm tra nội dung chính xác hơn
          if (res.includes('Gui ma xac nhan ve email thanh cong')) {
            console.log('Confirmation successful');
            this.router.navigateByUrl('/user/updatePassword');
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