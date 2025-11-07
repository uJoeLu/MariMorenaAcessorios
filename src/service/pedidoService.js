import { PedidoDAO } from "@/dao/pedidoDao";
import { SacolaDAO } from "@/dao/sacolaDao";
import { ProdutoService } from "./produtoService";
import { UsuarioDAO } from "@/dao/usuarioDao";

export class PedidoService {
  constructor() {
    this.dao = new PedidoDAO();
    this.sacolaDao = new SacolaDAO();
    this.produtoService = new ProdutoService();
    this.usuarioDao = new UsuarioDAO();
  }

  async criarPedido(itensSacola, enderecoId) {
    const usuario = await this.usuarioDao.getUsuarioLogado();
    if (!usuario) {
      throw new Error("Usuário não logado.");
    }

    // Verificar estoque e reduzir
    for (const item of itensSacola) {
      await this.produtoService.reduzirEstoque(item.produtoId, item.quantidade);
    }

    const pedido = {
      id: crypto.randomUUID(),
      usuarioId: usuario.id,
      enderecoId: enderecoId,
      itens: itensSacola,
      status: "Pendente",
      criadoEm: new Date().toISOString(),
      total: itensSacola.reduce((sum, item) => sum + (item.preco * item.quantidade), 0)
    };

    await this.dao.save(pedido);

    // Limpar sacola após pedido
    const sacola = await this.sacolaDao.getAll();
    for (const item of sacola) {
      await this.sacolaDao.delete(item.id);
    }

    return pedido;
  }

  async listarPedidosUsuario() {
    const usuario = await this.usuarioDao.getUsuarioLogado();
    if (!usuario) {
      throw new Error("Usuário não logado.");
    }

    const pedidos = await this.dao.getAll();
    return pedidos.filter(pedido => pedido.usuarioId === usuario.id);
  }

  async buscarPedidoPorId(id) {
    const pedido = await this.dao.getById(id);
    if (!pedido) {
      throw new Error("Pedido não encontrado.");
    }
    return pedido;
  }

  async atualizarStatusPedido(id, status) {
    const pedido = await this.buscarPedidoPorId(id);
    return await this.dao.update(id, { status });
  }

  async cancelarPedido(id) {
    const pedido = await this.buscarPedidoPorId(id);
    if (pedido.status !== "Pendente") {
      throw new Error("Pedido não pode ser cancelado.");
    }

    // Restaurar estoque
    for (const item of pedido.itens) {
      await this.produtoService.aumentarEstoque(item.produtoId, item.quantidade);
    }

    return await this.dao.update(id, { status: "Cancelado" });
  }
}
