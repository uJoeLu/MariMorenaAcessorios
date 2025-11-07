import { GenericDAO } from "./genericoDao";
import { LocalStorageDriver } from "./localStorageDriver";

const driver = new LocalStorageDriver();

export class EnderecoDAO extends GenericDAO {
  constructor() {
    super(driver, 'enderecos');
  }

  async buscarPorUsuarioId(usuarioId) {
    const enderecos = await this.getAll();
    return enderecos.filter(endereco => endereco.usuarioId === usuarioId);
  }
}
