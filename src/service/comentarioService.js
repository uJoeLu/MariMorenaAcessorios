import { ComentarioDAO } from "@/dao/comentarioDao";
import { UsuarioDAO } from "@/dao/usuarioDao";
import { ProdutoService } from "@/service/produtoService";

export class ComentarioService {
    constructor() {
        this.dao = new ComentarioDAO();
        this.usuarioDao = new UsuarioDAO();
        this.produtoService = new ProdutoService();
    }

    async listarComentariosPorProduto(produtoId) {
        await this.produtoService.buscarPorId(produtoId); // Verifica se produto existe
        return await this.dao.buscarPorProdutoId(produtoId);
    }

    async listarComentariosDoUsuario() {
        const usuario = await this.usuarioDao.getUsuarioLogado();
        if (!usuario) {
            throw new Error('Nenhum usuário logado.');
        }
        return await this.dao.buscarPorUsuarioId(usuario.id);
    }

    async adicionarComentario(produtoId, texto) {
        const usuario = await this.usuarioDao.getUsuarioLogado();
        if (!usuario) {
            throw new Error('Você precisa estar logado para comentar.');
        }
        if (!texto || texto.trim().length === 0) {
            throw new Error('O comentário não pode estar vazio.');
        }
        await this.produtoService.buscarPorId(produtoId); // Verifica se produto existe
        return await this.dao.adicionarComentario(usuario.id, produtoId, texto.trim());
    }

    async removerComentario(comentarioId) {
        const usuario = await this.usuarioDao.getUsuarioLogado();
        if (!usuario) {
            throw new Error('Nenhum usuário logado.');
        }
        const comentario = await this.dao.getById(comentarioId);
        if (!comentario) {
            throw new Error('Comentário não encontrado.');
        }
        if (comentario.usuarioId !== usuario.id) {
            throw new Error('Você só pode remover seus próprios comentários.');
        }
        await this.dao.delete(comentarioId);
    }
}
