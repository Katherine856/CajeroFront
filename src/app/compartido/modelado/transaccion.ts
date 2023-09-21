import { Cuenta } from "./cuenta";

export interface Transaccion{
    id_transaccion?: number,
    numCuentas: Cuenta,
    tipoTransaccion: String,
    fecha: String,
    numCuentaDestino: number,
    numDocDestino: number,
    monto: number
}