import { HttpRequest } from '@angular/common/http';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Credenciales } from '../app/compartido/modelado/credenciales';

export class servidor {

    url = environment.apiUrl; 

    constructor(private httpClient: HttpClient) { }

    login(credenciales: Credenciales) {
        return this.httpClient.post(this.url + 'auth', credenciales);
      }
}

