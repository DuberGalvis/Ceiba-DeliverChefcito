import { SinonStubbedInstance } from 'sinon';
import { Pedido } from 'src/dominio/pedido/modelo/pedido';
import { Producto } from 'src/dominio/producto/modelo/producto';
import { Reunion } from 'src/dominio/reunion/modelo/reunion';
import { Usuario } from 'src/dominio/usuario/modelo/usuario';
import { RepositorioPedidoPostgres } from 'src/infraestructura/pedido/adaptador/repositorio/repositorio-pedido.postgres';
import { createStubObj } from '../../../util/create-object.stub';

describe('RepositorioPedidoPostgres', () => {

    const _Pedido = Pedido as any;
    const _Usuario = Usuario as any;
    const _Producto = Producto as any;
    const _Reunion = Reunion as any; 

    let repositorioPedidoPostgres: SinonStubbedInstance<RepositorioPedidoPostgres>;
    repositorioPedidoPostgres = createStubObj<RepositorioPedidoPostgres>(['guardar']);
  
    it('Debe guarda el pedido en el repositorio', async () => {
        const pedidoAGuardar = new _Pedido( new _Usuario('juan', '1234', new Date().toISOString()),
        new _Producto('Alitas Picantes', 40000, 'Las Alitas picantes son prácticas y fáciles de preparar, asadas o al horno.'),
        new _Reunion('TIPO_GRANDE', 50000), 
        '2021-12-05',
        'Carrera 80 # 70',
        250000,
        4);

        await repositorioPedidoPostgres.guardar(pedidoAGuardar);

        expect(repositorioPedidoPostgres.guardar.getCalls().length).toBe(1);
        expect(repositorioPedidoPostgres.guardar.calledWith(pedidoAGuardar)).toBeTruthy();
    });
});
