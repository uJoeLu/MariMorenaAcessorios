import { UsuarioService } from "./usuarioService";

export class AuthService {
  constructor() {
    this.service = new UsuarioService();
  }

  async login(email, senha) {
    return await this.service.login(email, senha);
  }

  async logout() {
    await this.service.logout();
    window.location.href = "/";
  }

  async getUsuarioLogado() {
    try {
      return await this.service.dao.getUsuarioLogado();
    } catch (error) {
      throw new Error("Usuário não localizado. Faça login novamente.");
    }
  }

  async isAutenticado() {
    try {
      await this.getUsuarioLogado();
      return true;
    } catch {
      return false;
    }
  }
}
