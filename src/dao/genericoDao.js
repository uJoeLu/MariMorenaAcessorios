export class GenericDAO {
  constructor(driver, tabela) {
    this.driver = driver;
    this.tabela = tabela;
  }

  async getAll() {
    return await this.driver.all(this.tabela);
  }

  async getById(id) {
    return await this.driver.get(this.tabela, id);
  }

  async save(entity) {
    return await this.driver.save(this.tabela, entity);
  }

  async update(id, entity) {
    return await this.driver.update(this.tabela, id, entity);
  }

  async delete(id) {
    return await this.driver.delete(this.tabela, id);
  }
}
