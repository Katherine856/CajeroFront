import { HttpRequest } from '@angular/common/http';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Credenciales } from '../modelado/credenciales';
import { Injectable } from '@angular/core';
import { Cliente } from '../modelado/cliente';
import { Observable, of } from 'rxjs';
import { Cuenta } from '../modelado/cuenta';
import { Transaccion } from '../modelado/transaccion';

@Injectable({
  providedIn: 'root'
})

export class Servidor {

    url = environment.apiUrl; 

    constructor(private httpClient: HttpClient) { }

    login(credenciales: Credenciales) {
      return this.httpClient.post(this.url + 'api/otroLogin', credenciales);
    }

    crearCliente(cliente: Cliente): Observable<Cliente>{
      return this.httpClient.post<Cliente>(this.url + 'cliente/nuevo', cliente);
    }

    crearCuenta(cuenta: Cuenta): Observable<Cuenta>{
      return this.httpClient.post<Cuenta>(this.url + 'cuenta/nuevo', cuenta);
    }

    verCuentasCliente(id_Cliente: number): Observable<Cuenta>{
      return this.httpClient.get<Cuenta>(this.url + `cuenta/ver/${id_Cliente}`);
    }

    consignar(transaccion: Transaccion): Observable<Transaccion>{
      return this.httpClient.post<Transaccion>(this.url + 'transaccion/consignar', transaccion);
    }

    consultar(transaccion: Transaccion) {
      return this.httpClient.post(this.url + 'transaccion/consultar', transaccion);
    }

    retirar(transaccion: Transaccion): Observable<Transaccion>{
      return this.httpClient.post<Transaccion>(this.url + 'transaccion/retirar', transaccion);
    }

    calIntereses(){
      return this.httpClient.get(this.url + 'transaccion/intereses');
    }
}

