import { winReasons, loseReasons } from "../src/types/WSPacket";

export default class WSClient{
    ws = new WebSocket('ws://localhost:3000/ws');
    gameId?: string;
    uid?: string
    version?: string
    public matchMakingTimeout: number;
    gameEndReason: winReasons | loseReasons;
    gameFoundEvent = new Event('gameFound');
    matchmakingUpdateEvent = new Event('matchMakingUpdate');
    gameWonEvent = new Event('gameWon');
    gameLostEvent = new Event('gameLost');

    constructor() {
        this.ws.onopen = () => {
            console.log('Connected to WS server');
        };
        
        this.ws.onmessage = (msg) => {
            console.log(msg.data);
            this.onWSMessage(msg)
        }
    }

    onWSMessage(msg: MessageEvent) {
        const data = JSON.parse(msg.data);
        switch (data.o) {
            case 1:
                this.uid = data.data.uid
                this.version = data.data.version
                break;
            case 2:
                this.matchMakingTimeout = data.data.seconds;
                document.dispatchEvent(this.matchmakingUpdateEvent);
                break;
            case 3:
                this.gameId = data.data.gameId;
                document.dispatchEvent(this.gameFoundEvent);
                break;
            case 5:
                this.gameEndReason = data.data.reason;
                document.dispatchEvent(this.gameWonEvent);
                break;
            case 6:
                this.gameEndReason = data.data.reason;
                document.dispatchEvent(this.gameLostEvent);
                break;
        }
    }

    init() {
    }

    send(o: number, data?: any) {
        console.log(`--> ${JSON.stringify({ o, data })}`)
        this.ws.send(JSON.stringify({ o, data }));
    }

    beginMatchMaking() {
        this.send(2)
    }
}