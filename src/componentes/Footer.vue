<template>
    <footer class="footer">
        <div class="footer-sobre">
            <h2>Mari Morena</h2>
            <h4>Acessórios</h4>
            <p>Mari Morena Acessórios é uma loja dedicada a oferecer acessórios de alta qualidade e estilo para todas as
                ocasiões. Nossa missão é proporcionar beleza e elegância aos nossos clientes.</p>
        </div>
        <div class="links">
            <h3>Links Rápidos</h3>
            <ul>
                <li><router-link to="/">Inicio</router-link></li>
                <li><router-link to="/favoritos">Favoritos</router-link></li>
                <li><router-link to="/sacola">Sacola</router-link></li>
                <li><router-link to="/perfil">Conta</router-link></li>
            </ul>
        </div>
        <div class="categorias">
            <h3>Categorias</h3>
            <ul>
                <li 
                    v-for="categoria in categorias" 
                    :key="categoria"
                    @click="categoriasSelecionadas = categoria" 
                    :class="{ 'active-filtro': categoria === categoriasSelecionadas }">
                    {{ categoria }}
                </li>
            </ul>
        </div>
        <div class="contato">
            <h3>Contato</h3>
            <p>Email:mari.morena@gmail.com</p>
            <p>Telefone: (81) 99399-5306</p>
        </div>
        <div class="footer-content">
            <p>&copy; 2024 Mari Morena Acessórios. Todos os direitos reservados.</p>
        </div>
    </footer>
</template>

<script setup>
import { useFiltros} from '@/composable/Filtros';
const { categoriasSelecionadas, categorias} = useFiltros();


</script>

<style scoped>
.footer {
    display: flex;
    background-color: #BFAF8F;
    padding: 20px 0;
    text-align: center;
    justify-content: center;
    color: #000000;
    font-size: 16px;
}

.footer-sobre {
    display: block;
    max-width: 300px;
    text-align: justify;
    margin-bottom: 30px;
    padding: 0 20px;

}

.footer-sobre h2 {
    margin: 0;
}

.footer-sobre h4 {
    margin-top: 0px;
}

.footer-sobre p {
    bottom: 20px;
    line-height: 1.5;
}


.links {
    display: block;
    padding: 0 20px;
    margin: 0 30px 30px 30px;
    text-align: left;
}

.links h3 {
    margin-top: 0;
}

.links ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.links ul li {
    margin-bottom: 10px;
    cursor: pointer;
    text-align: left;
    text-decoration: none;
}

.categorias {
    display: block;
    padding: 0 20px;
    margin: 0 30px 30px 30px;
    text-align: left;

}

.categorias h3 {
    margin-top: 0;
}

.categorias ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.categorias ul li {
    margin-bottom: 10px;
    cursor: pointer;
    text-align: left;
    text-decoration: none;
}

.contato {
    display: block;
    padding: 0 20px;
    margin-bottom: 30px;
    text-align: left;
}

.contato h3 {
    margin-top: 0;
}

.contato p {
    margin: 5px 0;
}

.footer-content {
    display: block;
    padding: 0 20px;
    text-align: center;
    position: absolute;
    bottom: 0;
    width: 100vh;
    margin: 10px auto 10px 20px;
    font-size: 14px;
    color: #000000;
    border-top: 1px solid #000000;
    padding-top: 5px;
}
</style>