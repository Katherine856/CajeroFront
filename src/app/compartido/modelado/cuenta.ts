import { Cliente } from "./cliente"
import { TipoCuenta } from "./tipoCuenta"

export interface Cuenta {
    numCuenta?: number,
    tipoCuenta: TipoCuenta,
    docClientes: Cliente,
    saldo: number,
    clave: number
}