<template>
    <body>
        <div class="formulario">
            <div class="cadastro">
                <h1>Cadastro</h1>
            </div>
            <form>
                <div>
                    <label for="nome">Nome:</label>
                    <input type="text" id="nome" name="nome" required />
                </div>
                <div>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div>
                    <label for="senha">Senha:</label>
                    <input type="password" id="senha" name="senha" required />
                </div>
                <div>
                    <label for="confirmar-senha">Confirmar Senha:</label>
                    <input type="password" id="confirmar-senha" name="confirmar-senha" required />
                </div>
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    </body>

</template>
<script setup>{
}
</script>
<style scoped>
body {
    display: flex;
    height: 100vh;
}
.formulario {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    margin-right: 40px;
    display: flex;
    margin-top: 20px;
    margin-bottom: 30px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    flex-direction: column;
}
.cadastro {
    display: flex;
    justify-content: center;
    text-align: center;
    margin-bottom: 20px;
}
form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 300px;
}


</style>