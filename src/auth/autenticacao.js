const hashPassword = (senha) => {
    return btoa(senha); 
    
}
const getUsuarios = () => {
    const usuarios = localStorage.getItem('usuarios')
    return usuarios ? JSON.parse(usuarios) : []
}
const salvarUsuarios = (usuarios) => {
    localStorage.setItem('usuarios', JSON.stringify(usuarios))
}
export function cadastrarUsuario(usuario) {
    const { email, nome, dataNasc, endereco, bairro, cep, estado, cidade, telefone, senha } = usuario;
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
    
    const novoUsuario = { email, nome, dataNasc, endereco, bairro, cep, estado, cidade, telefone, senha: hashedSenha };
    usuarios.push(novoUsuario);
    salvarUsuarios(usuarios);
    
    return novoUsuario;
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
