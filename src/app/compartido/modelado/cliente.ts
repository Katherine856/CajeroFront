import { Sucursal } from './sucursal';

export interface Cliente {
    documento: number,
    t_documento: String,
    nombres: String,
    apellidos: String,
    correo: String,
    celular: number,
    direccion: String,
    contrasena: String,
    sucursal: Sucursal
}