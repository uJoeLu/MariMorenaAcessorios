import { GenericDAO } from "./genericoDao";
import { LocalStorageDriver } from "./localStorageDriver";

const driver = new LocalStorageDriver();

export class ComentarioDAO extends GenericDAO {
    constructor() {
        super(driver, 'comentarios');
    }

    async buscarPorUsuarioId(usuarioId) {
        const comentarios = await this.findAll();
        return comentarios.filter(comentario => comentario.usuarioId === usuarioId);
    }

    async buscarPorProdutoId(produtoId) {
        const comentarios = await this.findAll();
        return comentarios.filter(comentario => comentario.produtoId === produtoId);
    }

    async adicionarComentario(usuarioId, produtoId, texto) {
        const comentario = {
            id: crypto.randomUUID(),
            usuarioId: usuarioId,
            produtoId: produtoId,
            texto: texto,
            criadoEm: new Date().toISOString()
        };
        await this.save(comentario);
        return comentario;
    }
}
