<template>

    <body>
        <div class="sacola">
            <h1>Minha Sacola</h1>
        </div>
    </body>
</template>
<script>
export default {
    name: 'Sacola'
}
</script>
<style scoped>
.sacola{
    display: flex;
    width: 100%;
    height: 100vh;
    justify-content: center;
}
h1 {
    color: #000;
}
body {
    background-color: #FEDE8B;
    border: 10px solid #2B2B2B;
    border-radius: 5%;
    width: 50vw;
    min-height: 100vh;
    text-align: center;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>