<script setup>
import { NButton } from 'naive-ui';
import WSClient from '../WSClient';
import BaseViewVue from './BaseView.vue'
</script>

<template>
    <BaseViewVue>
        <template #left>
            <div style="font-size: xx-small; color: grey">
                U-{{ WSClient.uid }}
            </div>
            Game found!
        </template>
        <template #right class="background-color: none;">
            <div style="font-size: xx-small; color: grey">
                G-{{ WSClient.gameId }}
            </div>
            <div class="centered">
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