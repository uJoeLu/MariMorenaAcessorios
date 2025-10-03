<template>
    <div class=" pagina-cadastro">
        <div class="formulario">
            <form @submit.prevent="fazerlogin">
                <h1>CRIE SUA CONTA Mari Morena</h1>
                <div>
                    <p>Seu Email</p>
                    <label for="email"></label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div>
                    <p>Seu Nome Completo</p>
                    <label for="nome"></label>
                    <input type="text" id="nome" name="nome" required />
                </div>
                <div>
                    <p>Data de nascimento</p>
                    <label for="dataNasc"></label>
                    <input type="text" id="dataNacimento" name="sobrenome" required />
                    
                </div>
                <div>
                    <p>Seu Endereço</p>
                    <label for="endereco"></label>
                    <input type="text" id="endereco" name="endereco" required />
                </div>
                <div>
                    <p>Estado</p>
                    <label for="estado"></label>
                    <input type="text" id="estado" name="estado" required />
                </div>
                <div>
                    <p>Cidade</p>
                    <label for="cidade"></label>
                    <input type="text" id="cidade" name="cidade" required />
                </div>
                <div>
                    <p>Seu Telefone</p>
                    <label for="telefone"></label>
                    <input type="text" id="telefone" name="telefone" required />
                </div>
                <div>
                    <p>Senha</p>
                    <label for="senha"></label>
                    <input type="password" id="senha" name="senha" required />
                </div>
                <div>
                    <p>Confirmar Senha</p>
                    <label for="confirmar-senha"></label>
                    <input type="password" id="confirmar-senha" name="confirmar-senha" required />
                </div>
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    </div>

</template>
<script setup>
    const fazerlogin = () => {
    console.log('Cadastro realizado com sucesso!')
    }

    
</script>
<style scoped>
.pagina-cadastro {
    display: flex;
    height: 100vh;
}
</style>