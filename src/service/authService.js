import { UsuarioDAO } from "@/dao/usuarioDao";

export class AuthService {
  constructor() {
    this.dao = new UsuarioDAO();

  }

  async login(email, senha) {
    const usuario = await this.dao.getUsuarioPorEmail(email);
    if(!usuario || usuario.senha !== btoa(senha)) throw new Error ("Usuario e senha incorretos!");
    await this.dao.setUsuarioLogado(usuario);
    return usuario;
  }

  async logout() {
    await this.dao.logout();
    window.location.href = "/";
  }
  async getUsuarioLogado(){
    return await this.dao.getUsuarioLogado();
  }

  async isAutenticado() {
    const user = await this.getUsuarioLogado();
    return !!user;
  }
}