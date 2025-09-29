<template>
    <nav class="navbar">
        <div class="navbar-logo">
            <img src="@/assets/logo.png" alt="Mari Morena Acessórios" />
        </div>
        <div class="busca">
            <input type="text" placeholder="Buscar..." />
        </div>
        <ul class="navbar-links">
            <li><a ><router-link to="/"><font-awesome-icon :icon ="['fas','home']"/></router-link></a></li>
            <li><a><router-link to="/favoritos"><font-awesome-icon :icon ="['fas','heart']"/></router-link></a></li>
            <li><a><router-link to="/sacola"><font-awesome-icon :icon ="['fas','bag-shopping']"/></router-link></a></li>
            <li><a><router-link to="/conta"><font-awesome-icon :icon ="['fas','user']"/></router-link></a></li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: "Navbar"
};
</script>

<style scoped>
.navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #2B2B2B;
}
.navbar-logo {
    position: relative;
    left: 50%;
    transform: translateX(-50%);

}

.navbar-logo img {
    height: 100px;  
    width: auto;
}
.busca {
    left: 20px;
    position: absolute;
}
.busca input {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 300px;
    margin-left: 20px;
}

.navbar-links {
    list-style: none;
    display: flex;
    gap: 20px;
    margin-right: 20px;
}

.navbar-links a {
    text-decoration: none;
    font-size: 1.5rem;
    color: #FEDE8B;
    transition: color 0.2s;
}

.navbar-links a:hover {
    color: #c2185b;
}
</style>