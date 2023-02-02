<script setup lang="ts">
import { NButton, NSpin } from 'naive-ui';
import BaseViewVue from './BaseView.vue'

const { winReason } = defineProps(['winReason'])

const winReasons = {
    'MATCHMAKING_TIMEOUT': 'We were unable to allocate an opponent for you in time.',
    'OPPONENT_DISCONNECTED': 'Your opponent disconnected.',
    'GAME_WIN': 'You won with your high abilities and skills. Congratulations!'
}

const opponentLoseReasons = {
    'MATCHMAKING_TIMEOUT': 'Opponent not found.',
    'OPPONENT_DISCONNECTED': 'Disconnected from the server.',
    'GAME_WIN': 'You have lost. Better luck next time!'
}

</script>

<template>
    <BaseViewVue>
        <template #left>
            <div class="centered">
                <h1>
                    Victory
                </h1>
                <div style="margin: 5px">
                    {{ winReasons[winReason] }}
                </div>
            </div>
        </template>
        <template #right>
            <div class="centered">
                <h3>
                    Defeat
                </h3>
                <div style="margin: 5px">
                    {{ opponentLoseReasons[winReason] }}
                </div>
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