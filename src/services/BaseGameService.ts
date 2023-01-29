import { v4 } from "uuid";
import { BaseService } from "./BaseService";

export default class BaseGameService extends BaseService {
    gameId = v4()
    player1: string
    player2: string
    
    constructor(player1: string, player2: string) {
        super();
        this.player1 = player1;
        this.player2 = player2;
    }
}