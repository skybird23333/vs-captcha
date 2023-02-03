<script setup>
import { NButton } from 'naive-ui';
import BaseViewVue from './BaseView.vue'
</script>

<template>
    <BaseViewVue>
        <template #left>
            <b>
                To complete the captcha, you will need to win a game against a random opponent.
                Click on the button to start matchmaking.
            </b>
        </template>
        <template #right class="background-color: none;">
            <div class="centered">
                <NButton @click="$emit('beginMatchmaking')" type="primary">
                    Start matchmaking
                </NButton>
            </div>
        </template>
    </BaseViewVue>
</template>

<style scoped>
.centered {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>