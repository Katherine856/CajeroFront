import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './paginas/login/login.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { ConsignarComponent } from './paginas/consignar/consignar.component';
import { AngularMModule } from './angular-m/angular-m.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PanelErrorComponent } from './componentes/panel-error/panel-error.component';
import { CrearCuentaComponent } from './paginas/crear-cuenta/crear-cuenta.component';
import { RetirarComponent } from './paginas/retirar/retirar.component';
import { ConsularSaldoComponent } from './paginas/consular-saldo/consular-saldo.component';
import { PanelClaveComponent } from './componentes/panel-clave/panel-clave.component';
import { NuevoProductoComponent } from './paginas/nuevo-producto/nuevo-producto.component';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ConsignarComponent,
    LoginComponent,
    PanelErrorComponent,
    CrearCuentaComponent,
    RetirarComponent,
    ConsularSaldoComponent,
    PanelClaveComponent,
    NuevoProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
