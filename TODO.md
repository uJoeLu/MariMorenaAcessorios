# TODO: Refatoração DAO e Services

## 1. Refatorar LocalStorageDriver.js
- Tornar todos os métodos assíncronos retornando Promises.
- Adicionar try/catch para JSON.parse e JSON.stringify.
- Garantir que `all` retorne array vazio se não existir dados.
- ✅ Concluído

## 2. Refatorar GenericDAO.js
- Tornar métodos `getAll`, `getById`, `save`, `update`, `delete` assíncronos.
- ✅ Concluído

## 3. Refatorar ProdutoDAO.js
- Tornar constructor async e aguardar população de mock data.
- Corrigir `driver.get("produtos")` para `driver.all("produtos")`.
- Garantir que mock data seja salva corretamente.
- ✅ Concluído

## 4. Refatorar UsuarioDAO.js
- Adicionar métodos `getUsuarioPorEmail`, `getUsuarioLogado`, `setUsuarioLogado`.
- Tornar `findByEmail` async se necessário.
- ✅ Concluído

## 5. Refatorar EnderecoDAO.js
- Tornar `buscarPorUsuarioId` async.
- ✅ Concluído

## 6. Refatorar SacolaDAO.js e PedidoDAO.js
- Como herdam de GenericDAO, garantir que métodos sejam async (já cobertos pelo GenericDAO).
- ✅ Concluído

## 7. Refatorar UsuarioService.js
- Corrigir bug em `cadastrarUsuario` (referência a `novoUsuario.senha` antes de definir).
- Implementar `login`, `logout`, `buscarEnderecosDoUsuario`.
- Usar async/await onde apropriado.
- ✅ Concluído

## 8. Refatorar ProdutoService.js
- Adicionar método `buscarPorCategoria`.
- ✅ Concluído

## 9. Refatorar EnderecoService.js
- Ajustar para usar `UsuarioService.getUsuarioLogado` (que será implementado no UsuarioDAO).
- ✅ Concluído

## 10. Refatorar AuthService.js
- Corrigir bugs em `login` (comparação de senha).
- Corrigir typo em `UsuarioService.buscarEmail` (`emai` -> `email`).
- Usar async/await.
- ✅ Concluído

## 11. Criar PedidoService.js
- Implementar métodos para criar, listar, buscar, atualizar status e cancelar pedidos.
- Integrar com ProdutoService para controle de estoque.
- ✅ Concluído

## 12. Refatorar Stores (Pinia)
- **UsuarioStore**: Usar UsuarioService, adicionar tratamento de erros.
- **ProdutosStore**: Usar ProdutoService, adicionar getters e actions async.
- **SacolaStore**: Usar SacolaDAO, tornar actions async.
- **PedidosStore**: Usar PedidoService, adicionar actions para pedidos.
- **FavoritosStore**: Usar FavoritoService, tornar async.
- **ComentariosStore**: Usar UsuarioDAO, tornar async.
- **AuthStore**: Melhorar com try/catch e async.
- **EnderecoStore**: Adicionar tratamento de erros.
- ✅ Concluído

## 13. Criar FavoritoDAO e FavoritoService
- **FavoritoDAO**: Herdar de GenericDAO, métodos para buscar por usuarioId, adicionar/remover favorito, verificar se é favorito.
- **FavoritoService**: Depender de FavoritoDAO e UsuarioDAO, implementar regras de negócio para favoritos.
- **FavoritosStore**: Refatorar para usar FavoritoService.
- ✅ Concluído

## 14. Criar ComentarioDAO e ComentarioService
- **ComentarioDAO**: Herdar de GenericDAO, métodos para buscar por usuarioId/produtoId, adicionar comentário.
- **ComentarioService**: Depender de ComentarioDAO, UsuarioDAO e ProdutoService, implementar regras de negócio para comentários.
- **ComentariosStore**: Refatorar para usar ComentarioService.
- ✅ Concluído
