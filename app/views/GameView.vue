<script setup lang="ts">
import { inject } from 'vue'
import WSClient from '../WSClient';
import BaseViewVue from './BaseView.vue'
const client = inject<WSClient>('client')
</script>

<template>
    <BaseViewVue>
        <template #left>
            <div style="font-size: xx-small; color: grey">
                U-{{ client?.uid }}
            </div>
            Game found!
        </template>
        <template #right class="background-color: none;">
            <div style="font-size: xx-small; color: grey">
                G-{{ client?.gameId }}
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