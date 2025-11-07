import { GenericDAO } from "./genericoDao";
import { LocalStorageDriver } from "./localStorageDriver";

const driver = new LocalStorageDriver();

export class FavoritoDAO extends GenericDAO {
    constructor() {
        super(driver, 'favoritos');
    }

    async buscarPorUsuarioId(usuarioId) {
        const favoritos = await this.findAll();
        return favoritos.filter(favorito => favorito.usuarioId === usuarioId);
    }

    async adicionarFavorito(usuarioId, produto) {
        const favorito = {
            id: crypto.randomUUID(),
            usuarioId: usuarioId,
            produtoId: produto.id,
            produto: produto,
            criadoEm: new Date().toISOString()
        };
        await this.save(favorito);
        return favorito;
    }

    async removerFavoritoPorProdutoId(usuarioId, produtoId) {
        const favoritos = await this.buscarPorUsuarioId(usuarioId);
        const favorito = favoritos.find(f => f.produtoId === produtoId);
        if (favorito) {
            await this.delete(favorito.id);
        }
    }

    async isFavorito(usuarioId, produtoId) {
        const favoritos = await this.buscarPorUsuarioId(usuarioId);
        return favoritos.some(f => f.produtoId === produtoId);
    }
}
