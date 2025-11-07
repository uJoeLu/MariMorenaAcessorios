import { ProdutoDAO } from "@/dao/produtoDao";

export class ProdutoService {
  constructor() {
    this.dao = new ProdutoDAO();
  }

  async listarProdutos() {
    return await this.dao.getAll();
  }

  async buscarPorId(id) {
    const produto = await this.dao.getById(id);
    if (!produto) throw new Error("Produto não localizado!");
    return produto;
  }

  async buscarPorCategoria(categoria) {
    const produtos = await this.dao.getAll();
    return produtos.filter(produto => produto.categoria === categoria);
  }

  async cadastrar(produto) {
    const novoProduto = {
      id: crypto.randomUUID(),
      nome: produto.nome,
      descricao: produto.descricao || "",
      categoria: produto.categoria || "Outros",
      preco: parseFloat(produto.preco),
      quantidade: produto.quantidade || 0,
      imagem: produto.imagem || null,
      criadoEm: new Date().toISOString(),
    };
    await this.dao.save(novoProduto);
    return novoProduto;
  }

  async atualizar(id, novoProduto) {
    const velhoProduto = await this.buscarPorId(id);
    const atualizado = { ...velhoProduto, ...novoProduto };
    await this.dao.update(id, atualizado);
    return atualizado;
  }

  async deletar(id) {
    const existente = await this.buscarPorId(id);
    return await this.dao.delete(existente.id);
  }

  async reduzirEstoque(id, quantidade) {
    const produto = await this.buscarPorId(id);
    if (produto.quantidade < quantidade) throw new Error("Quantidade insuficiente");
    const novoEstoque = produto.quantidade - quantidade;
    return await this.atualizar(id, { quantidade: novoEstoque });
  }

  async aumentarEstoque(id, quantidade) {
    const produto = await this.buscarPorId(id);
    const novoEstoque = produto.quantidade + quantidade;
    return await this.atualizar(id, { quantidade: novoEstoque });
  }
}
