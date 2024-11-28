import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-infor',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './user-infor.component.html',
  styleUrl: './user-infor.component.css'
})
export class UserInforComponent implements OnInit {
  public user: any

  constructor(private http: HttpClient, private services: UserService, private router: Router) { }



  ngOnInit(): void {
    this.fetchDetails();
  }


  public fetchDetails() {
    this.services.getUserInfor().subscribe({
      next: (response) => {
        this.user = response;
        console.log('User data:', this.user); // Xác minh dữ liệu trong console
      },
      error: (error) => {
        console.error('Error fetching user info:', error);
      }
    });
  }

  onChangePassword() {
    this.router.navigateByUrl('/changePassword')
  }
}