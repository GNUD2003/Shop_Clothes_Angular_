import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
//import { Router } from 'express';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-header-login',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './header-login.component.html',
  styleUrl: './header-login.component.css'
})
export class HeaderLoginComponent {
  constructor(private router: Router, private authService: AuthService, private userService: UserService) { }
  onLogout() {
    this.authService.deleteToken();
    this.router.navigateByUrl('/user/login');
  }
  onInfor() {
    this.router.navigateByUrl('/userinfor');
  }
}
