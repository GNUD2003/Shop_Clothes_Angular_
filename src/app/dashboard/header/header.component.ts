import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';
//import { Router } from 'express';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router, private authService: AuthService, private userService: UserService) { }
  onLogout() {
    this.authService.deleteToken();
    this.router.navigateByUrl('/login');
  }

  // onInfor() {
  //   this.router.navigateByUrl('/userInfor');
  // }

}
