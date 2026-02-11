import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // DECLARAR SOLO UNA VEZ CADA UNA
  userName: string = '';
  userRole: string = '';
  userCity: string = '';
  avatarUrl: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.userName = localStorage.getItem('user_name') || 'Invitado';
    this.userRole = localStorage.getItem('user_role') || 'Sin Rol';
    this.userCity = localStorage.getItem('user_city') || 'No definida';
    this.avatarUrl = localStorage.getItem('user_avatar') || '';
    
    if (!localStorage.getItem('user_name')) {
      this.router.navigate(['/login']);
    }
  }

  getFullAvatarPath() {
    return this.avatarUrl 
      ? `http://localhost:3000/${this.avatarUrl.replace(/\\/g, '/')}` 
      : 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}