import { WSHandler } from "src/struct/WSHandler";
import { v4 } from "uuid";
import { BaseService } from "./BaseService";

export default class BaseGameService extends BaseService {
    gameId = v4()
    players: {
        [player: string]: {
            //TODO:
        }
    }
    
    constructor(player1: string, player2: string) {
        super();
    }

    leaveGame(player: WSHandler) {

    }
}