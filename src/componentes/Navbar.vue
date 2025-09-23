<template>
    <nav class="navbar">
        <div class="navbar-logo">
            <img src="@/assets/logo.png" alt="Mari Morena Acessórios" />
        </div>
        <ul class="navbar-links">
            <li><a href="#"><font-awesome-icon :icon ="['fas','home']"/></a></li>
            <li><a href="#"><font-awesome-icon :icon ="['fas','heart']"/></a></li>
            <li><a href="#"><font-awesome-icon :icon ="['fas','bag-shopping']"/></a></li>
            <li><a href="#"><font-awesome-icon :icon ="['fas','user']"/></a></li>
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
    padding: 1rem 1rem;
    box-shadow: #2B2B2B 0px 2px 1px;
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

.navbar-links {
    list-style: none;
    display: flex;
    gap: 1rem;
    margin: 0;
    padding: 0;
    align-items: center;
}

.navbar-links a {
    text-decoration: none;
    font-size: 2rem;
    color: #FEDE8B;
    transition: color 0.2s;
}

.navbar-links a:hover {
    color: #c2185b;
}
</style>