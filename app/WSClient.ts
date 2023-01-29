export default new class WSClient{
    ws = new WebSocket('ws://localhost:3000/ws');
    gameId: string;
    public matchMakingTimeout: number;
    gameFoundEvent = new Event('gameFound');
    matchmakingUpdateEvent = new Event('matchMakingUpdate');

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
            case 2:
                this.matchMakingTimeout = data.data.seconds;
                document.dispatchEvent(this.matchmakingUpdateEvent);
                break;
            case 3:
                this.gameId = data.data.gameId;
                document.dispatchEvent(this.gameFoundEvent);
                break;
        }
    }

    init() {
    }

    send(o: number, data?: any) {
        this.ws.send(JSON.stringify({ o, data }));
    }

    beginMatchMaking() {
        this.send(2)
    }
}