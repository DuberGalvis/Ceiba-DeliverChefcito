import { SinonStubbedInstance } from 'sinon';
import { Usuario } from 'src/dominio/usuario/modelo/usuario';
import { RepositorioUsuarioMysql } from 'src/infraestructura/usuario/adaptador/repositorio/repositorio-usuario-mysql';
import { createStubObj } from '../../../util/create-object.stub';

describe('RepositorioPedidoPostgres', () => {

    let repositorioUsuario: SinonStubbedInstance<RepositorioUsuarioMysql>;

    beforeEach(() => {
        repositorioUsuario = createStubObj<RepositorioUsuarioMysql>(['existeNombreUsuario', 'guardar']);
    });

    it('Debe guarda el pedido en el repositorio', async () => {
        const usuarioACrear = new Usuario('juan', '1234', new Date().toISOString());

        await repositorioUsuario.guardar(usuarioACrear);

        expect(repositorioUsuario.guardar.getCalls().length).toBe(1);
        expect(repositorioUsuario.guardar.calledWith(usuarioACrear)).toBeTruthy();
    });
});
