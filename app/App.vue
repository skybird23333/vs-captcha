<script setup lang="ts">
import CaptchaApp from './CaptchaApp.vue';
</script>

<template>
    <div class="game">
        <h1>
            My login form
        </h1>
        Username
        <input><br>
        Password
        <input><br>
        <CaptchaApp />
        <button disabled>Login</button>
    </div>
</template>

<style>
.game {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
}

body {
    margin: 0;
}
</style>