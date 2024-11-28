import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-header-admin',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './header-admin.component.html',
  styleUrl: './header-admin.component.css'
})
export class HeaderAdminComponent {
  constructor(private router: Router, private authService: AuthService, private userService: UserService) { }
  onLogout() {
    this.authService.deleteToken();
    this.router.navigateByUrl('/user/login');
  }
}
