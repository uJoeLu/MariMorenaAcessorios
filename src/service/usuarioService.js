import { UsuarioDAO } from "@/dao/usuarioDao";
import { EnderecoDAO } from "@/dao/enderecoDao";

export class UsuarioService {
  constructor() {
    this.dao = new UsuarioDAO();
    this.enderecoDao = new EnderecoDAO();
  }

  async getUsuarioId(id) {
    return await this.dao.getById(id);
  }

  async cadastrar(usuario, enderecoOpcional) {
    const usuarios = await this.dao.getAll();

    if (usuarios.some(u => u.email === usuario.email)) {
      throw new Error("Usuário já cadastrado com este email.");
    }

    const novoUsuario = {
      id: crypto.randomUUID(),
      ...usuario,
      senha: btoa(usuario.senha),
      eAdmin: false,
    };

    await this.dao.save(novoUsuario);

    if (enderecoOpcional) {
      const endereco = {
        ...enderecoOpcional,
        usuarioId: novoUsuario.id,
        id: crypto.randomUUID(),
        isPrincipal: true,
      };

      await this.enderecoDao.save(endereco);
      return { usuario: novoUsuario, endereco };
    }

    return { usuario: novoUsuario };
  }

  async buscarEnderecosDoUsuario(idUsuario) {
    return await this.enderecoDao.buscarPorUsuarioId(idUsuario);
  }

  async atualizar(id, dados) {
    const usuario = await this.getUsuarioId(id);
    if (!usuario) throw new Error("Usuário não localizado!");
    return await this.dao.update(id, dados);
  }

  async deletar(id) {
    const usuario = await this.getUsuarioId(id);
    if (!usuario) throw new Error("Usuário não localizado!");
    return await this.dao.delete(id);
  }

  async redefinirSenha(email, dataNasc, novaSenha) {
    const usuario = await this.dao.getUsuarioPorEmail(email);
    if (!usuario) {
      throw new Error("Usuário não encontrado.");
    }
    if (usuario.dataNasc !== dataNasc) {
      throw new Error("Data de nascimento incorreta.");
    }
    const dadosAtualizados = { senha: btoa(novaSenha) };
    return await this.dao.update(usuario.id, dadosAtualizados);
  }
}
