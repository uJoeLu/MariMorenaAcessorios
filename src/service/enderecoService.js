import { EnderecoDAO } from "@/dao/enderecoDao";
import { UsuarioDAO } from "@/dao/usuarioDao";

export class EnderecoService {
  constructor() {
    this.dao = new EnderecoDAO();
    this.usuarioDao = new UsuarioDAO();
  }

  async listarEnderecos() {
    const usuario = await this.usuarioDao.getUsuarioLogado();
    return await this.dao.buscarPorUsuarioId(usuario.id);
  }

  async adicionarEndereco(endereco) {
    const usuario = await this.usuarioDao.getUsuarioLogado();
    const novoEndereco = {
      id: crypto.randomUUID(),
      usuarioId: usuario.id,
      ...endereco,
      isPrincipal: false
    };
    await this.dao.save(novoEndereco);
  }

  async atualizarEndereco(id, dadosAtualizados) {
    return await this.dao.update(id, dadosAtualizados);
  }

  async removerEndereco(id) {
    return await this.dao.delete(id);
  }

  async definirEnderecoPrincipal(id) {
    const endereco = await this.dao.getById(id);
    if (!endereco) {
      throw new Error('Endereço não encontrado.');
    }
    const enderecosUsuario = await this.dao.buscarPorUsuarioId(endereco.usuarioId);
    for (const end of enderecosUsuario) {
      await this.dao.update(end.id, { isPrincipal: end.id === id });
    }
  }
}
