export class LocalStorageDriver {
  async all(tabela) {
    return new Promise((resolve, reject) => {
      try {
        const data = localStorage.getItem(tabela);
        resolve(data ? JSON.parse(data) : []);
      } catch (error) {
        reject(new Error(`Erro ao ler dados da tabela ${tabela}: ${error.message}`));
      }
    });
  }

  async get(tabela, id) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.all(tabela);
        const item = data.find(item => item.id === id);
        resolve(item || null);
      } catch (error) {
        reject(error);
      }
    });
  }

  async save(tabela, entity) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.all(tabela);
        entity.id = entity.id || crypto.randomUUID();
        data.push(entity);
        localStorage.setItem(tabela, JSON.stringify(data));
        resolve(entity);
      } catch (error) {
        reject(new Error(`Erro ao salvar na tabela ${tabela}: ${error.message}`));
      }
    });
  }

  async update(tabela, id, entity) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.all(tabela);
        const updatedData = data.map(item =>
          item.id === id ? { ...item, ...entity } : item
        );
        localStorage.setItem(tabela, JSON.stringify(updatedData));
        const updatedEntity = updatedData.find(item => item.id === id);
        resolve(updatedEntity);
      } catch (error) {
        reject(new Error(`Erro ao atualizar na tabela ${tabela}: ${error.message}`));
      }
    });
  }

  async delete(tabela, id) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.all(tabela);
        const filteredData = data.filter(item => item.id !== id);
        localStorage.setItem(tabela, JSON.stringify(filteredData));
        resolve();
      } catch (error) {
        reject(new Error(`Erro ao deletar na tabela ${tabela}: ${error.message}`));
      }
    });
  }
}
