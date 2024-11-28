import { Component } from '@angular/core';
import { RegisterComponent } from "./register/register.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RegisterComponent, RouterOutlet],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}
