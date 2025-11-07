import { GenericDAO } from "./genericoDao";
import { LocalStorageDriver } from "./localStorageDriver";

const driver = new LocalStorageDriver();

export class PedidoDAO extends GenericDAO {
  constructor() {
    super(driver, 'pedidos');
  }
}
