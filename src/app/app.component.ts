import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { UserComponent } from "./user/user.component";
import { HeaderComponent } from "./dashboard/header/header.component";
import { FooterComponent } from "./dashboard/footer/footer.component";
import { HeaderLoginComponent } from "./dashboard/header-login/header-login.component";
import { CommonModule } from '@angular/common';
import { HeaderAdminComponent } from "./admin/header-admin/header-admin.component";
//import { Router } from 'express';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserComponent, HeaderComponent, FooterComponent, HeaderLoginComponent, CommonModule, HeaderAdminComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ProjectAppCloth';

  constructor(public router: Router) { }

}
