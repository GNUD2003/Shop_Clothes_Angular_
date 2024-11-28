import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
//import { Router } from 'express';
//import jwt_decode from 'jwt-decode';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  form
  isSubmitted: boolean = false;

  constructor(public formBuilder: FormBuilder, private services: AuthService, private router: Router) {

    this.form = this.formBuilder.group({
      UserName: ['', Validators.required],
      Password: ['', Validators.required],

    });
  }

  ngOnInit(): void {
    if (this.services.isLoggedId())
      this.router.navigateByUrl('/dashboard')
  }

  // onSubmit() {
  //   this.isSubmitted = true;
  //   if (this.form.valid) {
  //     this.services.Login(this.form.value).subscribe({
  //       next: (res: any) => {
  //         // Kiểm tra và lưu accessToken vào localStorage
  //         if (res && res.data && res.data.accessToken) {
  //           localStorage.setItem('token', res.data.accessToken); // Lưu accessToken
  //           console.log('Token saved successfully:', res.data.accessToken);
  //         } else {
  //           console.log('No accessToken found in response');
  //         }

  //         // Điều hướng đến trang /home
  //         this.router.navigateByUrl('/dashboard');
  //       },
  //       error: (err) => console.log('Error during login:', err)
  //     });
  //   }
  // }
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.services.Login(this.form.value).subscribe({
        next: (res: any) => {
          // Kiểm tra và lưu accessToken vào localStorage
          if (res && res.data && res.data.accessToken) {
            const token = res.data.accessToken;
            localStorage.setItem('token', token); // Lưu accessToken
            console.log('Token saved successfully:', token);

            // Tự giải mã token để lấy thông tin Permission
            const decodedToken = this.decodeJwt(token);
            if (decodedToken) {
              const permission = decodedToken.Permission; // Lấy giá trị permission từ token
              console.log('Decoded token:', decodedToken);

              // Điều hướng dựa trên Permission
              if (permission === 'Admin') {
                this.router.navigateByUrl('/admin/manageProduct'); // Điều hướng đến /admin nếu là Admin
              } else if (permission === 'User') {
                this.router.navigateByUrl('/dashboard'); // Điều hướng đến /dashboard nếu là User
              } else {
                console.log('Unknown permission:', permission);
                this.router.navigateByUrl('/confirmEmail'); // Hoặc điều hướng đến trang lỗi
              }
            } else {
              console.error('Failed to decode token');
            }
          } else {
            console.log('No accessToken found in response');
          }
        },
        error: (err) => {
          console.error('Error during login:', err);
        },
      });
    }
  }

  // Hàm tự giải mã token JWT
  private decodeJwt(token: string): any {
    try {
      // Tách lấy phần payload của token
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload); // Trả về object JSON
    } catch (error) {
      console.error('Error decoding token:', error);
      return null; // Trả về null nếu giải mã thất bại
    }
  }

  hasDisplayableError(controlName: string): Boolean {
    const control = this.form.get(controlName);
    return Boolean(control?.invalid) && (this.isSubmitted || Boolean(control?.touched))
  }
}