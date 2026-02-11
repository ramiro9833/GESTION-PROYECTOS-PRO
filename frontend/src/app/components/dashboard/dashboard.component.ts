import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Importante

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  userName: string = '';
  userRole: string = '';
  userCity: string = '';
  avatarUrl: string = '';
  userId: string = '';

  // Proyectos y Estadísticas
  projects: any[] = []; 
  totalRequirements: number = 0;
  highPriorityPercentage: number = 0;
  isSidebarCollapsed = false;
  showModal: boolean = false;
  newProject = { name: '', description: '', priority: 'LOW' };

  // Inyectamos HttpClient como 'http'
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.userId = localStorage.getItem('user_id') || '';
    this.userName = localStorage.getItem('user_name') || 'Usuario';
    this.userCity = localStorage.getItem('user_city') || 'No definida';
    this.avatarUrl = localStorage.getItem('user_avatar') || '';
    
    const role = localStorage.getItem('user_role');
    const roleLabels: any = {
      'ADMIN': 'Administrador',
      'DEVELOPER': 'Desarrollador',
      'MANAGER': 'Gerente'
    };
    this.userRole = role ? roleLabels[role] : 'Sin Rol';

    this.loadProjects();
  }

  loadProjects() {
    if (!this.userId) return;
    
    // Cambia la URL a tu endpoint real de NestJS
    this.http.get<any[]>(`http://localhost:3000/projects/user/${this.userId}`).subscribe({
      next: (data) => {
        this.projects = data;
        this.calculateStats();
      },
      error: (err) => console.error("Error al cargar proyectos", err)
    });
  }

  calculateStats() {
    // Suma de requerimientos usando el conteo que viene del backend
    this.totalRequirements = this.projects.reduce((acc, p) => acc + (p._count?.requirements || 0), 0);

    // % de proyectos con prioridad ALTA (HIGH)
    const highPriorityCount = this.projects.filter(p => p.priority === 'HIGH').length;
    this.highPriorityPercentage = this.projects.length > 0 
      ? Math.round((highPriorityCount / this.projects.length) * 100) 
      : 0;
  }

  saveProject() {
    const payload = {
      ...this.newProject,
      ownerId: this.userId
    };

    this.http.post('http://localhost:3000/projects', payload).subscribe({
      next: () => {
        this.toggleModal();
        this.loadProjects(); // Ahora sí existe esta función
        this.newProject = { name: '', description: '', priority: 'LOW' };
      },
      error: (err: any) => console.error("Error al guardar", err) // (err: any) evita el error TS7006
    });
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

  toggleModal() {
    this.showModal = !this.showModal;
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}