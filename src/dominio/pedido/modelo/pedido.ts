import { Producto } from 'src/dominio/producto/modelo/producto';
import { Reunion } from 'src/dominio/reunion/modelo/reunion';
import { Usuario } from 'src/dominio/usuario/modelo/usuario';

enum ESTADO {
    ESTADO_ACTIVO = 'ESTADO_ACTIVO',
    ESTADO_CANCELADO = 'ESTADO_CANCELADO',
    ESTADO_FINALIZADO = 'ESTADO_FINALIZADO',
}

export class Pedido {
  readonly #usuario: Usuario;
  readonly #producto: Producto;
  readonly #reunion: Reunion;
  readonly #fechaCreacion: Date;
  readonly #estado: ESTADO;
  readonly #direccion: string;
  readonly #valorTotal: number;


  constructor(usuario: Usuario, producto: Producto, reunion: Reunion, fechaCreacion: Date, estado: ESTADO, direccion: string, valorTotal: number) {
    this.#usuario = usuario;
    this.#producto = producto;
    this.#reunion = reunion;
    this.#fechaCreacion = fechaCreacion;
    this.#estado = estado;
    this.#direccion = direccion;
    this.#valorTotal = valorTotal;
  }

  get usuario(): Usuario {
    return this.#usuario;
  }

  get producto(): Producto {
    return this.#producto;
  }

  get reunion(): Reunion {
    return this.#reunion;
  }

  get fechaCreacion(): Date {
    return this.#fechaCreacion;
  }

  get estado(): ESTADO {
    return this.#estado;
  }

  get direccion(): string{
    return this.#direccion;
  }

  get valorTotal(): number{
    return this.#valorTotal;
  }
}