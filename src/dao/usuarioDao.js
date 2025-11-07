import { GenericDAO } from "./genericoDao";
import { LocalStorageDriver } from "./localStorageDriver";

const driver = new LocalStorageDriver();

export class UsuarioDAO extends GenericDAO {
  constructor() {
    super(driver, 'usuarios');
  }

  async getUsuarioPorEmail(email) {
    const usuarios = await this.getAll();
    return usuarios.find(usuario => usuario.email === email) || null;
  }

  async getUsuarioLogado() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (!usuarioLogado) {
      return null;
    }
    try {
      return JSON.parse(usuarioLogado);
    } catch (error) {
      localStorage.removeItem('usuarioLogado');
      return null;
    }
  }

  async setUsuarioLogado(usuario) {
    try {
      localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
    } catch (error) {
      throw new Error('Erro ao salvar usuário logado.');
    }
  }
  async logout(){
    localStorage.removeItem('usuarioLogado');
  }
}
