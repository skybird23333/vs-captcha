<script setup lang="ts">
import CaptchaApp from './CaptchaApp.vue';
import WSClient from './WSClient';

WSClient.init()
</script>

<template>
    <div class="game">
        <CaptchaApp />
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
    background-color: rgb(36, 36, 36);
}

body {
    margin: 0;
}
</style>