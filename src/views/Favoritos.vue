<template>

    <body>
        <div>
            <h1>Favoritos</h1>
        </div>
    </body>
</template>
<script setup>{
}
</script>
<style scoped>
h1 {
    color: #FEDE8B;
    margin-bottom: 20px;
}
body {
    display: flex;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    justify-items: center;
    align-items: center;
    background-color: #2B2B2B;
    border: 10px solid #FEDE8B;
    border-radius: 5%;
    width: 50vw;
    min-height: 100vh;
}

@media (max-width: 768px) {
    body {
        width: 90vw;
        border: 5px solid #FEDE8B;
        padding: 10px;
    }

    h1 {
        font-size: 1.5rem;
    }
}
</style>
