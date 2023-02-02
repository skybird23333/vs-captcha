<script setup lang="ts">
import { NButton, NSpin } from 'naive-ui';
import BaseViewVue from './BaseView.vue'
import WSClient from '../WSClient';
const { timeout } = defineProps(['timeout'])
</script>

<template>
    <BaseViewVue>
        <template #left>
            <div style="font-size: xx-small; color: grey">
                U-{{ WSClient.uid }}
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