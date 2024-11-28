import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css'
})
export class NewPasswordComponent implements OnInit {
  form;
  isSubmitted: boolean = false;

  constructor(public formBuilder: FormBuilder, private services: AuthService, private router: Router) {
    this.form = this.formBuilder.group({
      confirmCode: ['', Validators.required], // Mã xác nhận
      newPassword: ['', [Validators.required, Validators.minLength(6)]], // Mật khẩu mới
      confirmPassword: ['', Validators.required], // Xác nhận mật khẩu
    });
  }

  ngOnInit(): void {
    if (this.services.isLoggedId()) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.form.valid) {
      const payload = {
        confirmCode: this.form.get('confirmCode')?.value as string, // Ép kiểu thành string
        newPassword: this.form.get('newPassword')?.value as string,
        confirmPassword: this.form.get('confirmPassword')?.value as string,
      };

      this.services.updatePassword(payload).subscribe({
        next: (res: any) => {
          console.log('Password updated successfully:', res);
          // Điều hướng sau khi thành công
          this.router.navigateByUrl('/user/login');
        },
        error: (err) => {
          console.error('Error updating password:', err);
        }
      });
    }
  }

  hasDisplayableError(controlName: string): boolean {
    const control = this.form.get(controlName);
    return Boolean(control?.invalid) && (this.isSubmitted || Boolean(control?.touched));
  }
}

