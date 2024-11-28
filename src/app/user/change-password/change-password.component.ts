import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  form;
  isSubmitted: boolean = false;

  constructor(public formBuilder: FormBuilder, private services: AuthService, private router: Router) {
    this.form = this.formBuilder.group({
      oldPassWord: ['', Validators.required], // Mã xác nhận
      newPassWord: ['', [Validators.required, Validators.minLength(6)]], // Mật khẩu mới
      confirmPassWord: ['', Validators.required], // Xác nhận mật khẩu
    });
  }


  onSubmit() {
    this.isSubmitted = true;

    if (this.form.valid) {
      const payload = {
        oldPassWord: this.form.get('oldPassWord')?.value as string, // Ép kiểu thành string
        newPassWord: this.form.get('newPassWord')?.value as string, // Sửa lại từ `newPassword` -> `newPassWord`
        confirmPassWord: this.form.get('confirmPassWord')?.value as string, // Sửa lại từ `confirmPassword` -> `confirmPassWord`
      };

      this.services.changePassword(payload).subscribe({
        next: (res: any) => {
          console.log('Password updated successfully:', res);
          // Điều hướng sau khi thành công
          this.router.navigateByUrl('/userinfor');
        },
        error: (err) => {
          console.error('Error updating password:', err);
        },
      });
    }
  }

  hasDisplayableError(controlName: string): boolean {
    const control = this.form.get(controlName);
    return Boolean(control?.invalid) && (this.isSubmitted || Boolean(control?.touched));
  }
}

