import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoDocumento } from 'src/app/Modelos/TipoDocumento';
import { TipoDocumentoService } from '../../Servicios/tipo-documento.service';
import { ModalQuienesSomosService } from '../../Servicios/modal-quienes-somos.service';
import { ModalLoginIncorrectoService } from '../../Servicios/modal-login-incorrecto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Servicios/authentication.service';
import { ClienteService } from 'src/app/Servicios/cliente.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  TituloAccionABMC = {
    R: 'Registrarse',
    C: 'Iniciar sesión',

  };
  Documentos: TipoDocumento[] = [];
  AccionABMC = 'C';
  FormLogin: FormGroup;
  FormRegistro: FormGroup;
  submitted = false;
  Mensajes = {
    RD: 'Revisar los datos ingresados...'
  };
  returnUrl: string;
  error = '';
  constructor
  (
    public formBuilder: FormBuilder,
    private tipoDocumentoService: TipoDocumentoService,
    private modalQuienesSomosService: ModalQuienesSomosService,
    private modalLoginIncorrectoService: ModalLoginIncorrectoService,
    private authenticationService: AuthenticationService,
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.FormLogin = this.formBuilder.group({
      Usuario: ['', [Validators.required]],
      Password: ['', [Validators.required]]
    });
    this.FormRegistro = this.formBuilder.group({
      IdCliente: [0],
      Usuario: ['', [Validators.required]],
      PassEncriptada: ['', [Validators.required]],
      Nombre: ['', [Validators.required]],
      Apellido: ['', [Validators.required]],
      TipoDocumento: ['', [Validators.required]],
      NroDocumento: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      Telefono: ['', [Validators.required]],      
      FechaNacimiento: ['', [Validators.required,, Validators.pattern('(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](19|20)[0-9]{2}')]]
    });

    // this.GetTokerLogin();  
    //Nacionalidad: ['', [Validators.required]],
    this.returnUrl = '/menu-principal';
  }

  GetTiposDocumentos() {
    this.tipoDocumentoService.get().subscribe((res: TipoDocumento[]) => {
      this.Documentos = res;
      console.log(this.Documentos);
    });
  }


  loginCuenta() {
    this.FormLogin.markAllAsTouched();
    this.authenticationService.login(this.FormLogin.controls.Usuario.value, this.FormLogin.controls.Password.value)
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          /* this.error = error; */
          this.modalLoginIncorrectoService.Alert('Verifique que los datos ingresados sean correctos. En caso de no contar con una cuenta registrese por favor.', '¡Ingreso incorrecto!', 'i');
        }
      );
  }

 /* validarMayoriadeEdad(fechaActual : Date, fechaNacimiento : string) {
    var arrFecha = itemCopy.FechaAlta.substr(0, 10).split("/");
    if (arrFecha.length == 3)
      itemCopy.FechaAlta = new Date(
        arrFecha[2],
        arrFecha[1] - 1,
        arrFecha[0]
      ).toISOString();
  } */

  forgotPassword() {
    alert('redirigir a recuperar contraseña');
  }

  crearCliente() {
    this.FormRegistro.reset();
    this.AccionABMC = 'R';
    this.GetTiposDocumentos();
    this.submitted=false;
   

  }

  cancelar() {
    this.AccionABMC = 'C';
    this.FormLogin.reset();
    //this.FormRegistro.reset();
  }

  Grabar() {
    //this.FormRegistro.markAllAsTouched();
    this.submitted = true;

    if(this.FormRegistro.invalid) {
      console.log(this.FormRegistro)
      return;
    }

    //crea una copia de los datos del formulario para cambiar la fecha
    const itemCopy  = {...this.FormRegistro.value};

    var arrFecha = itemCopy.FechaNacimiento.substr(0,10).split('/');
    if(arrFecha.length == 3)
      itemCopy.FechaNacimiento = new Date (
        arrFecha[2],
        arrFecha[1]-1,
        arrFecha[0]
      ).toISOString();

    if(itemCopy.IdCliente==0||itemCopy.IdCliente==null)
    {
      itemCopy.IdCliente=0;
        this.clienteService.post(itemCopy).subscribe( data => {
          this.cancelar();
          this.modalQuienesSomosService.Alert('Se registro exitosamente', '', 's');
        },
        error => {          
          this.modalLoginIncorrectoService.Alert('Usuario ya existente.', '¡Ingreso incorrecto!', 'w');
        }
        /*(res: any) => {
        this.cancelar();
        this.modalQuienesSomosService.Alert('Se registro exitosamente', '', 's');}*/
        );
      
    }
  }

  subirFoto() {
    alert("En construccion - botones subir foto");
 
  }


  llamarModal() {
    this.modalQuienesSomosService.Alert('Nicolas Alvarez, Jimena Bustos Paulich, Melani Crespo, Martin Diaz, Maximiliano Iglesias del Castillo, Matias LLorens, Joel Ocampo, Melania Peralta Flores, Tomas Pozzo - Programa Clip 2020 - Grupo 1D -', 'Conoce a nuestro Equipo!', 'i');
  }
}
