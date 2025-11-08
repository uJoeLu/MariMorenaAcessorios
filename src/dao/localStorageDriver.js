export class LocalStorageDriver {
  async all(tabela) {
    try {
      const data = localStorage.getItem(tabela)
      const parsed = data ? JSON.parse(data) : []
      return Array.isArray(parsed) ? parsed : []
    } catch (error) {
      throw new Error(`Erro ao ler dados da tabela ${tabela}: ${error.message}`)
    }
  }

  async get(tabela, id) {
    try {
      const data = await this.all(tabela)
      const item = data.find(item => item.id === id)
      return item || null
    } catch (error) {
      throw new Error(`Erro ao buscar item na tabela ${tabela}: ${error.message}`)
    }
  }

  async save(tabela, entity) {
    try {
      const data = await this.all(tabela)
      entity.id = entity.id || crypto.randomUUID()
      data.push(entity)
      localStorage.setItem(tabela, JSON.stringify(data))
      return entity
    } catch (error) {
      throw new Error(`Erro ao salvar na tabela ${tabela}: ${error.message}`)
    }
  }

  async update(tabela, id, entity) {
    try {
      const data = await this.all(tabela)
      const updatedData = data.map(item =>
        item.id === id ? { ...item, ...entity } : item
      )
      localStorage.setItem(tabela, JSON.stringify(updatedData))
      const updatedEntity = updatedData.find(item => item.id === id)
      return updatedEntity
    } catch (error) {
      throw new Error(`Erro ao atualizar na tabela ${tabela}: ${error.message}`)
    }
  }

  async delete(tabela, id) {
    try {
      const data = await this.all(tabela)
      const filteredData = data.filter(item => item.id !== id)
      localStorage.setItem(tabela, JSON.stringify(filteredData))
      return true
    } catch (error) {
      throw new Error(`Erro ao deletar na tabela ${tabela}: ${error.message}`)
    }
  }
}
