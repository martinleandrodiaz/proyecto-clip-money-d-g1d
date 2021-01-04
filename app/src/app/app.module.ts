import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptorService } from '../app/interceptors/auth-interceptor.service';

import { RouterModule } from '@angular/router';
import { LoginComponent } from './Componentes/login/login.component';
import { HomeComponent } from './Componentes/home/home.component';
import { MenuPrincipalComponent} from './Componentes/menuPrincipal/menu-principal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { AuthGuard } from './helpers/auth.guard';



import { APP_BASE_HREF, DatePipe } from '@angular/common';
import { ModalQuienesSomosComponent } from './Componentes/modal-quienes-somos/modal-quienes-somos.component';
import { ModalLoginIncorrectoComponent } from './Componentes/modal-login-incorrecto/modal-login-incorrecto.component';
import { TransaccionesComponent } from './Componentes/transacciones/transacciones.component';
import { MovimientosComponent } from './Componentes/movimientos/movimientos.component';
import { MiPerfilComponent } from './Componentes/mi-perfil/mi-perfil.component';
import { LoginRequest } from './Modelos/LoginRequest';
import { FormDomicilioComponent } from './Componentes/form-domicilio/form-domicilio.component';
import { MyInterceptor } from './interceptors/my-interceptor';
import { CuentaComponent } from './Componentes/cuenta/cuenta.component';

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    MenuPrincipalComponent,
    InicioComponent,
    ModalQuienesSomosComponent,
    ModalLoginIncorrectoComponent,
    TransaccionesComponent,
    MovimientosComponent,
    MiPerfilComponent,
    FormDomicilioComponent,
    CuentaComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot
    (
      [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'menu-principal', component: MenuPrincipalComponent, canActivate: [AuthGuard] },
      { path: 'form-domicilio', component: FormDomicilioComponent, canActivate: [AuthGuard] },
      { path: 'app-mi-perfil', component: MiPerfilComponent, canActivate: [AuthGuard] },
      { path: 'cuenta-pesos', component: CuentaComponent, canActivate: [AuthGuard] },
      { path: '**', redirectTo: '/login', pathMatch: 'full' }
      ]
    ),

  ],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
  }, {provide: APP_BASE_HREF, useValue : '/'}, LoginRequest, DatePipe, { provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true }],
  bootstrap: [InicioComponent]
})
export class AppModule { }