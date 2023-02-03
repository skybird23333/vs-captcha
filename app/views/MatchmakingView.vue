<script setup lang="ts">
import { inject } from 'vue';
import WSClient from '../WSClient';
import BaseViewVue from './BaseView.vue'
const { timeout } = defineProps(['timeout'])
const client = inject<WSClient>('client')
</script>

<template>
    <BaseViewVue>
        <template #left>
            <div style="font-size: xx-small; color: grey">
                U-{{ client?.uid }}
            </div>
        </template>
        <template #right>
            <div class="centered">
                <h1>
                    {{ 60 - timeout }}
                </h1>
                Searching for a match...
            </div>
        </template>
    </BaseViewVue>
</template>

<style scoped>
.centered {
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>