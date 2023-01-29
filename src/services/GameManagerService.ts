import BaseGameService from "./BaseGameService";
import { BaseService } from "./BaseService";

export default new class GameManagerService extends BaseService {
    games: BaseGameService[] = [];

    createGame(player1: string, player2: string) {
        const game = new BaseGameService(player1, player2);
        this.games.push(game);
        return game;
    }
}