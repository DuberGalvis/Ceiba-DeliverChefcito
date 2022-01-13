import { DaoPedidoPostgres } from 'src/infraestructura/pedido/adaptador/dao/dao-pedido.postgres';
import { createStubObj } from '../../../util/create-object.stub';
import { Usuario } from 'src/dominio/usuario/modelo/usuario';
import { Producto } from 'src/dominio/producto/modelo/producto';
import { Reunion } from 'src/dominio/reunion/modelo/reunion';
import { ComandoCambiarPedido } from 'src/aplicacion/pedido/cambio/cambiar-pedido.comando';
import { ComandoCancelarPedido } from 'src/aplicacion/pedido/cambio/cancelar-pedido.comando';

describe('DaoPedidoPostgres', () => {
  
  const _NombreUsuario = 'Lorem'; 

  let daoPedidoPostgres = createStubObj<DaoPedidoPostgres>(['listar', 'cambiarPedido', 'cancelarPedido']);

  it('Debe traer una lista de pedidos del usuario', async () => {
    const nombreUsuario = _NombreUsuario;

    await daoPedidoPostgres.listar(nombreUsuario);

    expect(daoPedidoPostgres.listar.getCalls().length).toBe(1);
    expect(daoPedidoPostgres.listar.calledWith(nombreUsuario)).toBeTruthy();
  });

  it('Debe traer una lista de pedidos del usuario', async () => {
    const cambiarPedido: ComandoCambiarPedido = {
      id: 5,
      usuario: new Usuario('juan','1234', new Date().toISOString()),
      producto: new Producto ('Alitas Picantes', 40000, 'Las Alitas picantes son prácticas y fáciles de preparar, asadas o al horno.'),
      reunion: new Reunion ('TIPO_GRANDE', 50000),
      fechaRealizacion: '2021-12-05',
      direccion: 'Carrera 80 # 70', 
      valorTotal: 250000,
      horasDeServicio: 5,
    }

    await daoPedidoPostgres.cambiarPedido(cambiarPedido);

    expect(daoPedidoPostgres.cambiarPedido.getCalls().length).toBe(1);
    expect(daoPedidoPostgres.cambiarPedido.calledWith(cambiarPedido)).toBeTruthy();
  });

  it('Debe traer una lista de pedidos del usuario', async () => {
    const cancelarPedido: ComandoCancelarPedido = { id: 5 };

    await daoPedidoPostgres.cancelarPedido(cancelarPedido);

    expect(daoPedidoPostgres.cancelarPedido.getCalls().length).toBe(1);
    expect(daoPedidoPostgres.cancelarPedido.calledWith(cancelarPedido)).toBeTruthy();
  });  
});
