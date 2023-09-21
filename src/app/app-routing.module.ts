import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsignarComponent } from './paginas/consignar/consignar.component';
import { LoginComponent } from './paginas/login/login.component';
import { CrearCuentaComponent } from './paginas/crear-cuenta/crear-cuenta.component';
import { RetirarComponent } from './paginas/retirar/retirar.component';
import { ConsularSaldoComponent } from './paginas/consular-saldo/consular-saldo.component';
import { NuevoProductoComponent } from './paginas/nuevo-producto/nuevo-producto.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'consignar', component: ConsignarComponent},
  {path: 'crear', component: CrearCuentaComponent},
  {path: 'retirar', component: RetirarComponent},
  {path: 'consultar', component: ConsularSaldoComponent},
  {path: 'nuevo', component: NuevoProductoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
