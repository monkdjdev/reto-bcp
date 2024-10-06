import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  formularioRegistro: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formularioRegistro = this.fb.group({
      nombreCompleto: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  obtenerErrorNombre() {
    const nombreControl = this.formularioRegistro.get('nombreCompleto');
    if ((nombreControl?.touched || nombreControl?.dirty) && nombreControl?.hasError('required')) {
      return 'El nombre completo es obligatorio';
    }
    return '';
  }

  obtenerErrorCorreo() {
    const correoControl = this.formularioRegistro.get('correoElectronico');
    if (correoControl?.touched || correoControl?.dirty) {
      if (correoControl?.hasError('required')) {
        return 'El correo electrónico es obligatorio';
      }
      if (correoControl?.hasError('email')) {
        return 'El correo electrónico no es válido';
      }
    }
    return '';
  }

  obtenerErrorContrasena() {
    const contrasenaControl = this.formularioRegistro.get('contrasena');
    if (contrasenaControl?.touched || contrasenaControl?.dirty) {
      if (contrasenaControl?.hasError('required')) {
        return 'La contraseña es obligatoria';
      }
      if (contrasenaControl?.hasError('minlength')) {
        return 'La contraseña debe tener al menos 8 caracteres';
      }
    }
    return '';
  }

  onSubmit() {
    if (this.formularioRegistro.valid) {
      console.log(this.formularioRegistro.value);
      alert('Registro exitoso')
      this.formularioRegistro.reset();
    }
  }
}
