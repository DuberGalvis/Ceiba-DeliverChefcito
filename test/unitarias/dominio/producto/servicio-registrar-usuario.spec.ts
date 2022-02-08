import { ServicioRegistrarProducto } from 'src/dominio/producto/servicio/servicio-registrar-producto';
import { Producto } from 'src/dominio/producto/modelo/producto';
import { RepositorioProducto } from 'src/dominio/producto/puerto/repositorio/repositorio-producto';
import { SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';


describe('ServicioRegistrarProducto', () => {

  let servicioRegistrarProducto: ServicioRegistrarProducto;
  let repositorioProductoStub: SinonStubbedInstance<RepositorioProducto>;

  beforeEach(() => {

    repositorioProductoStub = createStubObj<RepositorioProducto>(['existeNombreProducto', 'guardar']);
    servicioRegistrarProducto = new ServicioRegistrarProducto(repositorioProductoStub);
  });

  it('si el nombre del producto ya existe no se puede crear y deberia retonar error', async () => {

    repositorioProductoStub.existeNombreProducto.returns(Promise.resolve(true));

    await expect(
      servicioRegistrarProducto.ejecutar(
        new Producto('Alitas Picantes', 40000, 'Bañadas en salsa tabasco con finas hiervas', '../../imagenes'),
      ),
    ).rejects.toThrow('El nombre del producto Alitas Picantes ya existe');
  });

  it('si el nombre no existe guarda el producto al repositorio', async () => {
    const producto = new Producto('Alitas Picantes', 40000, 'Bañadas en salsa tabasco con finas hiervas', '../../imagenes');
    repositorioProductoStub.existeNombreProducto.returns(Promise.resolve(false));

    await servicioRegistrarProducto.ejecutar(producto);

    expect(repositorioProductoStub.guardar.getCalls().length).toBe(1);
    expect(repositorioProductoStub.guardar.calledWith(producto)).toBeTruthy();
  });
});
