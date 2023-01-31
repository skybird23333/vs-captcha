<script setup>
import { NButton } from 'naive-ui';
import BaseViewVue from './BaseView.vue'
</script>

<template>
    <BaseViewVue>
        <template #left>
            <b>
                To complete the captcha, you will need to win a game against a random opponent.
                Click on the button below to start matchmaking.
            </b>
        </template>
        <template #right class="background-color: none;">
            <NButton>
                Start matchmaking
            </NButton>
        </template>
    </BaseViewVue>
</template>