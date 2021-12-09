import { SinonStubbedInstance } from "sinon";
import { ESTADO, Pedido } from "src/dominio/pedido/modelo/pedido";
import { RepositorioPedido } from "src/dominio/pedido/puerto/repositorio/repositorio-pedido";
import { ServicioRegistrarPedido } from "src/dominio/pedido/servicio/servicio-registrar-pedido"
import { Producto } from "src/dominio/producto/modelo/producto";
import { Reunion } from "src/dominio/reunion/modelo/reunion";
import { Usuario } from "src/dominio/usuario/modelo/usuario";
import { createStubObj } from "test/util/create-object.stub";

describe('ServicioRegistrarPedido', () => {

    let servicioRegistrarPedido: ServicioRegistrarPedido;
    let repositorioPedidoStub: SinonStubbedInstance<RepositorioPedido>;

    beforeEach(() => {

        repositorioPedidoStub = createStubObj<RepositorioPedido>(['guardar']);
        servicioRegistrarPedido = new ServicioRegistrarPedido(repositorioPedidoStub);
    });

    it('si el pedido es valido guarda al repositorio', async () => {
        const pedido = new Pedido(new Usuario('juan', '1234', new Date().toISOString()),
        new Producto('Alitas Picantes', 40000, 'Las Alitas picantes son prácticas y fáciles de preparar, asadas o al horno.'),
        new Reunion('TIPO_GRANDE', 50000), 
        '2021-12-05',
        ESTADO.ESTADO_ACTIVO,
        'Carrera 80 # 70',
        250000);

        await servicioRegistrarPedido.ejecutar(pedido);

        expect(repositorioPedidoStub.guardar.getCalls().length).toBe(1);
        expect(repositorioPedidoStub.guardar.calledWith(pedido)).toBeTruthy();
    });
})