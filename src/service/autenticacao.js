const hashPassword = (senha) => {
    return btoa(senha); 
    
}
const   getUsuarios = () => {
    const usuarios = localStorage.getItem('usuarios')
    return usuarios ? JSON.parse(usuarios) : []
}
const salvarUsuarios = (usuarios) => {
    localStorage.setItem('usuarios', JSON.stringify(usuarios))
}
const atualizarSessao = (usuarioAtualizado) => {
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioAtualizado))
}
export function atualizarEndereco(enderecoAtualizado){
    const usuario = getUsuarioLogado();
    if (!usuario) {
        throw new Error('Nenhum usuário logado.');
    }
    const enderecoIndex = usuario.enderecos.findIndex(end => end.id === enderecoAtualizado.id);
    if (enderecoIndex === -1) {
        throw new Error('Endereço não encontrado.');
    }
    usuario.enderecos[enderecoIndex] = {
        ...usuario.enderecos[enderecoIndex],
        ...enderecoAtualizado,
    };
    atualizarSessao(usuario);
}
export function adicionarEndereco(novoEndereco) {
    const usuario = getUsuarioLogado();
    if (!usuario) {
        throw new Error('Nenhum usuário logado.');
    }
    usuario.enderecos.push(novoEndereco);
    atualizarSessao(usuario);
}
export function removerEndereco(idEndereco) {
    const usuario = getUsuarioLogado();
    if (!usuario) {
        throw new Error('Nenhum usuário logado.');
    }
    usuario.enderecos = usuario.enderecos.filter(end => end.id !== idEndereco);
    atualizarSessao(usuario);
}
export function cadastrarUsuario(usuario, endereco ) {
    const { email, nome, dataNasc, telefone, senha } = usuario;
    const { rua, bairro, cep, estado, cidade } = endereco;

    const hashedSenha = hashPassword(senha);
    const usuarios = getUsuarios();
    
    const cepValido = /^[0-9]{5}-?[0-9]{3}$/.test(cep);

    const usuarioExistente = usuarios.find(user => user.email === email);
    
    if (!cepValido) {
        throw new Error ( 'CEP inválido. Por favor, insira um CEP no formato 00000-000 ou 00000000.');
    }
    if (usuarioExistente) {
        throw new Error ('Usuário já cadastrado com este email.');
    }
    const primeiroEndereco = {
        id: crypto.randomUUID(),
        rua, 
        bairro, 
        cep, 
        estado, 
        cidade,
        isPrincipal: true,
    };
    
    const novoUsuario = { 
        id: crypto.randomUUID(),
        email, 
        nome, 
        dataNasc, 
        telefone, 
        senha: hashedSenha,
        enderecos: [primeiroEndereco],
        eAdmin: false,
    };
    usuarios.push(novoUsuario);
    salvarUsuarios(usuarios);
    atualizarSessao(novoUsuario);
    
    return novoUsuario;
}
export function atualizarUsuario(dadosAtualizados) {
    const usuarioLogado = getUsuarioLogado();
    if (!usuarioLogado) {
        throw new Error('Nenhum usuário logado.');
    };
    const usuarios = getUsuarios();
    const usuarioIndex = usuarios.findIndex(user => user.id === usuarioLogado.id); 
    if (usuarioIndex === -1) {
        throw new Error('Usuário não encontrado.');
    }
    const usuarioAtualizado = {
        ...usuarios[usuarioIndex],
        ...dadosAtualizados,
    };
    usuarios[usuarioIndex] = usuarioAtualizado;
    salvarUsuarios(usuarios);
    atualizarSessao(usuarioAtualizado);
    return usuarioAtualizado;
}

export function logar( email, senha){
    const hashedSenha = hashPassword(senha);
    const usuarios = getUsuarios();
    
    const usuario = usuarios.find(user => user.email === email && user.senha === hashedSenha);
    if (!usuario) {
        throw new Error('Email ou senha incorretos.');
    }
    
    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
    
    
    return usuario;
    
}
export function getUsuarioLogado() {
    const usuario = localStorage.getItem('usuarioLogado');
    return usuario ? JSON.parse(usuario) : null;
}
export function redefinirSenha(email, dataNasc, novaSenha) {
    const usuarios = getUsuarios();
    const usuarioIndex = usuarios.findIndex(user => user.email === email && user.dataNasc === dataNasc);
    
    if (usuarioIndex === -1) {
        throw new Error('Usuário não encontrado.');
    }
    
    const hashedNovaSenha = hashPassword(novaSenha);
    usuarios[usuarioIndex].senha = hashedNovaSenha;
    
    salvarUsuarios(usuarios);
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarios[usuarioIndex]));
}

export function logout() {
    localStorage.removeItem('usuarioLogado');
    window.location.href = '/';
    
}
