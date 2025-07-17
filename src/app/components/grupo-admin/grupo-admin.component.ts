
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-grupo-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './grupo-admin.component.html',
  styleUrls: ['./grupo-admin.component.scss']
})

export class GrupoAdminComponent implements OnInit {
  colaboradores: any[] = [];
  colaborador = {
    id: 0,
    nombreCompleto: '',
    puesto: '',
    rol: '',
    fotoUrl: ''
  };
  defaultImage = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

  // 🔧 Variables de control del modal
  modalVisible = false;
  esEdicion = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.colaboradores = [
      {
        id: 1,
        nombreCompleto: 'Juan Pérez',
        puesto: 'Técnico',
        rol: 'lider',
        fotoUrl: ''
      }
    ];
  }

  abrirModal(colab: any = null) {
    this.modalVisible = true;
    if (colab) {
      this.esEdicion = true;
      this.colaborador = { ...colab };
    } else {
      this.esEdicion = false;
      this.colaborador = {
        id: 0,
        nombreCompleto: '',
        puesto: '',
        rol: '',
        fotoUrl: ''
      };
    }
  }

  cerrarModal() {
    this.modalVisible = false;
  }

  guardarColaborador() {
    if (!this.colaborador.nombreCompleto || !this.colaborador.rol) {
      alert('Por favor, llena todos los campos obligatorios.');
      return;
    }
    const nuevo = { ...this.colaborador };
    nuevo.id = Date.now();
    this.colaboradores.push(nuevo);
    this.cerrarModal();
  }

  editarColaborador(colaborador: any) {
      this.abrirModal(colaborador);
    }


  actualizarColaborador() {
    const index = this.colaboradores.findIndex(c => c.id === this.colaborador.id);
    if (index !== -1) {
      this.colaboradores[index] = { ...this.colaborador };
    }
    this.cerrarModal();
  }

  eliminar(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        this.colaboradores = this.colaboradores.filter(c => c.id !== id);
        Swal.fire('¡Eliminado!', 'El colaborador ha sido eliminado.', 'success');
      }
    });
  }

  regresar() {
    this.router.navigate(['/dashboard']);
  }
}
