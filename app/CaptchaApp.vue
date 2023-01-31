<script setup lang="ts">
import WSClient from './WSClient';
import { NConfigProvider, darkTheme, NButton } from 'naive-ui';
import { reactive } from 'vue';
import InitView from './views/InitView.vue';

const state = reactive<{
    mode: 'init' | 'matchmaking' | 'game' | 'end',
    matchMakingTimeout: number,
}>({
    mode: 'init',
    matchMakingTimeout: 0,
})

const beginMatchmaking = () => {
    state.mode = 'matchmaking';
    WSClient.beginMatchMaking();
}

document.addEventListener('gameFound', () => {
    state.mode = 'game';
})

document.addEventListener('matchMakingUpdate', () => {
    state.matchMakingTimeout = WSClient.matchMakingTimeout;
    console.log(WSClient.matchMakingTimeout)
})

</script>

<template>
    <NConfigProvider :theme="darkTheme">
        <div class="captcha">
            <template v-if="state.mode === 'init'">
                <InitView></InitView>
            </template>
            <div v-if="state.mode === 'matchmaking'">
                <b>
                    Matchmaking in progress...
                    {{ state.matchMakingTimeout }}
                </b>
            </div>
            <div v-if="state.mode === 'game'">
                <b>
                    Game found!
                    {{ WSClient.gameId }}
                </b>
            </div>
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