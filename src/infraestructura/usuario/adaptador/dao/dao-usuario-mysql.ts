import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { DaoUsuario } from 'src/dominio/usuario/puerto/dao/dao-usuario';
import { UsuarioDto } from 'src/aplicacion/usuario/consulta/dto/usuario.dto';

@Injectable()
export class DaoUsuarioMysql implements DaoUsuario {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async consultar(nombre: string, clave: string): Promise<UsuarioDto> {
    let respuesta: Array<UsuarioDto>;
    respuesta = await this.entityManager.query(
      'SELECT u.nombre, u.clave FROM USUARIO u WHERE u.nombre = $1 AND u.clave = $2',
      [nombre, clave],
    );

    if(respuesta.length === 0){
      throw new NotFoundException('Error de Credenciales o Usuario no Existe');
    }
    
    return respuesta[0];
  }

  async cambiar(nombre: string, claveActual: string, claveNueva: string) {
    let respuesta: Array<number>;
    respuesta = await this.entityManager.query(
      'UPDATE USUARIO SET clave = $1 WHERE nombre = $2 AND clave = $3',
      [claveNueva, nombre, claveActual],
    );

    if(!respuesta.includes(1)){
      throw new NotFoundException('Error de Credenciales, verifique su clave actual');
    }
  }

  async eliminar(nombre: string) {
    this.entityManager.query(
      'DELETE FROM PEDIDO p WHERE p.usuario_id = (SELECT u.id FROM USUARIO u WHERE u.nombre = $1)',
      [nombre]
    );
    
    return this.entityManager.query(
      'DELETE FROM USUARIO u WHERE u.nombre = $1',
      [nombre]
    );
  }
}
