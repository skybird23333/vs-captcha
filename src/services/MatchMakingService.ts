import { GameService } from "src/types/game";
import { WSHandler } from "../struct/WSHandler";
import { BaseService } from "./BaseService";
import GameManagerService from "./GameManagerService";

type rejectReason = 'WITHDRAWN' | 'TIMEOUT';

export default new class MatchMakingService extends BaseService {
    matchmakingQueue:
    {
        user: WSHandler;
        resolve: ({game}: {game: GameService}) => void;
        reject: (arg0: rejectReason) => void;
        startedAt: Date;
        timeout: NodeJS.Timeout;
    }[]
    = [];

    constructor() {
        super();
        setInterval(() => this.tick(), 1000);
    }

    async startMatchmakingForUser(user: WSHandler): Promise<{game: GameService}> {
        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                this.matchmakingQueue = this.matchmakingQueue.filter(x => x.user.uid !== user.uid);
                reject('TIMEOUT');
            }, 60000);
            this.matchmakingQueue.push({
                user,
                resolve,
                reject,
                startedAt: new Date(),
                timeout
            })
        })
    }

    withdrawFromMatchmaking(user: WSHandler) {
        const matchmakingData = this.matchmakingQueue.find(x => x.user.uid === user.uid);
        matchmakingData?.reject('WITHDRAWN');
        this.matchmakingQueue = this.matchmakingQueue.filter(x => x.user.uid !== user.uid);
        console.log(`Matchmaking: ${user.uid} withdrew from matchmaking`);
    }

    tick() {
        if (this.matchmakingQueue.length >= 2) {
            const [a, b] = this.matchmakingQueue.splice(0, 2);
            const game = GameManagerService.createGame(a.user.uid, b.user.uid);
            a.resolve({game});
            b.resolve({game});
            clearTimeout(a.timeout);
            clearTimeout(b.timeout);
            console.log(`Matchmaking: ${a.user.uid} vs ${b.user.uid} (${game.gameId})`);
            console.log(game)
        }
    }
}