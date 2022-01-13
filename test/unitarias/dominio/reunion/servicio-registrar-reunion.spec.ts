import { ServicioRegistrarReunion } from 'src/dominio/reunion/servicio/servicio-registrar-reunion';
import { Reunion } from 'src/dominio/reunion/modelo/reunion';
import { RepositorioReunion } from 'src/dominio/reunion/puerto/repositorio/repositorio-reunion';
import { SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';

describe('ServicioRegistrarReunion', () => {

  let servicioRegistrarReunion: ServicioRegistrarReunion;
  let repositorioReunionStub: SinonStubbedInstance<RepositorioReunion>;

  beforeEach(() => {

    repositorioReunionStub = createStubObj<RepositorioReunion>(['existeTipoReunion', 'guardar']);
    servicioRegistrarReunion = new ServicioRegistrarReunion(repositorioReunionStub);
  });

  it('si el tipo de reunion ya existe no se puede crear y deberia retonar error', async () => {

    repositorioReunionStub.existeTipoReunion.returns(Promise.resolve(true));

    await expect(
      servicioRegistrarReunion.ejecutar(
        new Reunion('TIPO_PEQUENA', 25000),
      ),
    ).rejects.toThrow('El tipo de reunion TIPO_PEQUENA ya existe');
  });

  it('si el tipo no existe guarda la reunion en el repositorio', async () => {
    const reunion = new Reunion('TIPO_MEDIANA', 40000);
    repositorioReunionStub.existeTipoReunion.returns(Promise.resolve(false));

    await servicioRegistrarReunion.ejecutar(reunion);

    expect(repositorioReunionStub.guardar.getCalls().length).toBe(1);
    expect(repositorioReunionStub.guardar.calledWith(reunion)).toBeTruthy();
  });
});
