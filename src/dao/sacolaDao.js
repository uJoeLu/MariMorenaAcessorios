import { GenericDAO } from "./genericoDao";
import { LocalStorageDriver } from "./localStorageDriver";

const driver = new LocalStorageDriver();

export class SacolaDAO extends GenericDAO {
  constructor() {
    super(driver, 'sacolas');
  }
}
