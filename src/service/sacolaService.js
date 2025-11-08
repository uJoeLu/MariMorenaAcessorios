import { SacolaDAO } from "@/dao/sacolaDao";

export class SacolaService {
  constructor() {
    this.dao = new SacolaDAO();
  }

  async getSacola(usuarioId) {
    const id = usuarioId || "guest";
    const sacola = await this.dao.getById(id);
    return sacola || { id, usuarioId: id, itens: [], total: 0 };
  }

  async salvarSacola(sacola) {
    sacola.total = sacola.itens.reduce((t, i) => t + i.preco * i.quantidade, 0);
    await this.dao.save(sacola);
    return sacola;
  }

  async adicionarItem(usuarioId, produto) {
    const sacola = await this.getSacola(usuarioId);
    const existente = sacola.itens.find(i => i.produtoId === produto.id);

    if (existente) {
      existente.quantidade += 1;
    } else {
      sacola.itens.push({
        produtoId: produto.id,
        nome: produto.nome,
        descricao: produto.descricao,
        categoria: produto.categoria,
        preco: produto.preco,
        quantidade: 1,
        imagem: produto.imagem,
      });
    }

    return await this.salvarSacola(sacola);
  }

  async diminuirItem(usuarioId, produtoId) {
    const sacola = await this.getSacola(usuarioId);
    const item = sacola.itens.find(i => i.produtoId === produtoId);

    if (!item) return sacola;

    if (item.quantidade > 1) item.quantidade--;
    else sacola.itens = sacola.itens.filter(i => i.produtoId !== produtoId);

    return await this.salvarSacola(sacola);
  }

  async limparSacola(usuarioId) {
    const sacola = { id: usuarioId, usuarioId, itens: [], total: 0 };
    return await this.salvarSacola(sacola);
  }
}
