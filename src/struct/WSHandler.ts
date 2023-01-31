import WebSocket from 'ws'
import { v4 } from 'uuid'
import { IWSBasePacket } from '../types/WSPacket'
import MatchMakingService from '../services/MatchMakingService'
/**
 * @file WSHandler.ts
 * @description Handles an inbound websocket connection and talks to the various services
 */
export class WSHandler {
    ws: WebSocket
    uid = v4()
    mode: 'matchmaking' | 'game' | 'connected' | 'disconnected' = 'connected'

    latency: number
    latencyTimer?: Date

    matchmakingPassedTime = 0

    gameId?: string

    constructor(ws: WebSocket) {
        this.ws = ws
        ws.on('message', (msg) => {this.onMessage(msg.toString())})
        ws.on('ping', () => ws.pong())
        ws.on('pong', () => {
            this.latency = new Date().getTime() - this.latencyTimer!.getTime()
        })
        ws.on('close', () => {
            if(this.mode === 'matchmaking') {
                MatchMakingService.withdrawFromMatchmaking(this)
            }
            this.mode = 'disconnected'
        })
        this.send(1, { uid: this.uid, version: 1 })
        setInterval(() => this.tick(1000), 1000)

        this.onMessage = this.onMessage.bind(this)
    }

    send(o: number, data?: any) {
        this.ws.send(JSON.stringify({ o, data }))
    }

    async startMatchMaking() {
        this.mode = 'matchmaking'
        MatchMakingService.startMatchmakingForUser(this)
        .then(({ game }) => {
            this.send(3, { gameId: game.gameId }) //TODO: testing
            this.mode = 'game'
            this.gameId = game.gameId
        })
        .catch((e) => {
            switch(e) {
                case 'TIMEOUT':
                    this.ws.send(5, { reason: 'MATCHMAKING_TIMEOUT'})
                case 'WITHDRAWN':
                    break
                default:
            }
        })
    }

    private onMessage(msg: string) {
        try {
            const packet: IWSBasePacket = JSON.parse(msg)
            switch (packet.o) {
                case 2:
                    if(this.mode === 'matchmaking') {
                        return
                    }
                    this.startMatchMaking()
                    break
                }
            } catch (e) {
                console.error(e)
                this.ws.close(1003, 'Invalid JSON')
            }
        }
        

    private tick(delta: number) {
        if (this.mode === 'matchmaking') {
            this.matchmakingPassedTime += delta
            this.send(2, { seconds: Math.floor(this.matchmakingPassedTime / 1000) })
        }

        this.latencyTimer = new Date()
        this.ws.ping()
    }
}