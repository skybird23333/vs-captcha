<script setup lang="ts">
import WSClient from './WSClient';
import { NConfigProvider, darkTheme, NButton } from 'naive-ui';
import { provide, reactive } from 'vue';
import InitView from './views/InitView.vue';
import MatchmakingView from './views/MatchmakingView.vue';
import WinView from './views/WinView.vue';
import GameView from './Views/GameView.vue';

const client = new WSClient()

client.init()

provide<WSClient>('client', client)

const state = reactive<{
    mode: 'init' | 'matchmaking' | 'game' | 'end',
    matchMakingTimeout: number,
}>({
    mode: 'init',
    matchMakingTimeout: 0,
})

const beginMatchmaking = () => {
    state.mode = 'matchmaking';
    client.beginMatchMaking();
}

document.addEventListener('gameFound', () => {
    state.mode = 'game';
})

document.addEventListener('matchMakingUpdate', () => {
    state.matchMakingTimeout = client.matchMakingTimeout;
})

document.addEventListener('gameWon', () => {
    state.mode = 'end';
})

</script>

<template>
    <NConfigProvider :theme="darkTheme">
        <div class="captcha">
            <template v-if="state.mode === 'init'">
                <InitView @beginMatchmaking="beginMatchmaking"></InitView>
            </template>
            <template v-if="state.mode === 'matchmaking'">
                <MatchmakingView :timeout="state.matchMakingTimeout"></MatchmakingView>
            </template>
            <template v-if="state.mode === 'game'">
                <GameView />
            </template>
            <template v-if="state.mode === 'end'">
                <WinView :winReason="client.gameEndReason"></WinView>
            </template>
        </div>
    </NConfigProvider>
</template>


<style scoped>
.captcha {
    color: white;
    background-color: black;
    width: 400px;
    height: 200px;
}
</style>