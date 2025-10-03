<template>
    <div class="login-page">
        <div class="logo">
            <img src="../assets/logofull.jpeg" alt="Logo">
        </div>
        <div class="form">
            <h2>Entrar com sua conta Mari Morena </h2>
            <form>
                <div>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div>
                    <label for="senha">Senha:</label>
                    <input type="password" id="senha" name="senha" required />
                </div>
                <div class="button-group">
                    <button><router-link to="/cadastro">Cadastre-se</router-link>
                    </button>
                    <button type="submit">Entrar</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup>{
}
</script>
<style scoped>
.login-page {
    display: grid;
    gap: 200px;
    place-items: center;
    margin: auto;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    align-items: center;
    height: 100vh;

}

.form {
    max-width: 400px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
    background: #FEDE8B;
}
.form .h2{
    margin-top: 0;
    text-align: center;
    max-width: 200px;
}
form{
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 3rem;
    max-width: 300px;
    margin-left: 3rem;
    margin-right: 3rem;
    justify-content: center;
    align-items: center;
}
.button-group {
    display: flex;
    place-items: center;
    gap: 10px;
    
}

</style>