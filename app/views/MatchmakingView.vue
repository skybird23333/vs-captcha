<script setup lang="ts">
import { NButton, NSpin } from 'naive-ui';
import BaseViewVue from './BaseView.vue'
const { timeout } = defineProps(['timeout'])
</script>

<template>
    <BaseViewVue>
        <template #left>
            <div class="centered">
                <b>
                    Searching for a match...
                </b>
            </div>
        </template>
        <template #right>
            <div class="centered">
                <h1>
                    {{ 60 - timeout }}
                </h1>
                <NSpin></NSpin>
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