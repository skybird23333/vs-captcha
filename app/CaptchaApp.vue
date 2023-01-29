<script setup lang="ts">
import WSClient from './WSClient';
import { NConfigProvider, darkTheme, NButton } from 'naive-ui';
import { reactive } from 'vue';

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
    <div class="captcha">
        <NConfigProvider :theme="darkTheme">
            <div v-if="state.mode === 'init'">
                <b>
                    To complete the captcha, you will need to win a game against a random opponent.
                    Click on the button below to start matchmaking.
                </b>

                <NButton @click="beginMatchmaking">
                    Start matchmaking
                </NButton>
            </div>
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
        </NConfigProvider>
    </div>
</template>


<style scoped>

.captcha {
    color: white;
    background-color: black;
    width: 400px;
    height: 200px;
}
</style>