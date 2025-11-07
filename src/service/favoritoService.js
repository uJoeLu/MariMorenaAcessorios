import { FavoritoDAO } from "@/dao/favoritoDao";
import { UsuarioDAO } from "@/dao/usuarioDao";

export class FavoritoService {
    constructor() {
        this.dao = new FavoritoDAO();
        this.usuarioDao = new UsuarioDAO();
    }

    async listarFavoritos() {
        const usuario = await this.usuarioDao.getUsuarioLogado();
        if (!usuario) {
            throw new Error('Nenhum usuário logado.');
        }
        return await this.dao.buscarPorUsuarioId(usuario.id);
    }

    async adicionarFavorito(produto) {
        const usuario = await this.usuarioDao.getUsuarioLogado();
        if (!usuario) {
            throw new Error('Você precisa estar logado para favoritar.');
        }
        const jaFavorito = await this.dao.isFavorito(usuario.id, produto.id);
        if (jaFavorito) {
            throw new Error('Produto já está nos favoritos.');
        }
        return await this.dao.adicionarFavorito(usuario.id, produto);
    }

    async removerFavorito(produtoId) {
        const usuario = await this.usuarioDao.getUsuarioLogado();
        if (!usuario) {
            throw new Error('Nenhum usuário logado.');
        }
        await this.dao.removerFavoritoPorProdutoId(usuario.id, produtoId);
    }

    async toggleFavorito(produto) {
        const usuario = await this.usuarioDao.getUsuarioLogado();
        if (!usuario) {
            throw new Error('Você precisa estar logado para favoritar.');
        }
        const jaFavorito = await this.dao.isFavorito(usuario.id, produto.id);
        if (jaFavorito) {
            await this.removerFavorito(produto.id);
        } else {
            await this.adicionarFavorito(produto);
        }
    }

    async isFavorito(produtoId) {
        const usuario = await this.usuarioDao.getUsuarioLogado();
        if (!usuario) {
            return false;
        }
        return await this.dao.isFavorito(usuario.id, produtoId);
    }
}
