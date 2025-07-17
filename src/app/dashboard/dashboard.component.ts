import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(private router: Router) {}

  irAColaboradores() {
    this.router.navigate(['/admin']);
  }

  cerrarSesion() {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Se cerrará la sesión actual.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, cerrar sesión',
    cancelButtonText: 'Cancelar'
  }).then(result => {
    if (result.isConfirmed) {
      localStorage.clear();
      this.router.navigate(['/']);
    }
  });
}
}
