export interface IWSBasePacket {
    o: number,
    d?: any
}

export type winReasons =
    'MATCHMAKING_TIMEOUT' |
    'GAME_TIE' |
    'GAME_WIN' |
    'OPPONENT_DISCONNECTED' 

export type loseReasons =
    'GAME_LOSE'

// NAMING
// I = Interface
// WS = Websocket
// Game = Game specific packets
// A = All (both ways)
// C = Clientbound
// S = Serverbound
// I[WS/Game][A|C|S][PacketName]

/**
 * Clientbound, sent on connect
 */
export interface IWSCInit extends IWSBasePacket {
    o: 1
    data: {
        uid: string
        version: number
    }
}
export interface IWSSBeginMatchmaking extends IWSBasePacket {
    o: 2
}
export interface IWSCMatchmakingUpdate extends IWSBasePacket {
    o: 2
    data: {
        seconds: number
    }
}
export interface IWSCGameFound extends IWSBasePacket {
    o: 3
}
export interface IWSAGameUpdate extends IWSBasePacket {
    o: 4
    c: string
    data?: any
}

export interface IWSCGameWin extends IWSBasePacket {
    o: 5
    data: {
        reason: winReasons
    }
}

export interface IWSCGameLose extends IWSBasePacket {
    o: 6
    data: {
        reason: loseReasons
    }
}

export namespace Games {
    export namespace Common {
        export interface ICGameCountdown extends IWSAGameUpdate {
            c: 'C1'
            data: {
                seconds: number
            }
        }
        export interface ICGameStart extends IWSAGameUpdate {
            c: 'C2'
        }
    }
    export namespace TicTacToe {
        export interface ICGameInit extends IWSAGameUpdate {
            c: 'T1'
            data: {
                starter: boolean,
                isCircle: boolean
            }
        }
        export interface ISGamePlacement extends IWSAGameUpdate {
            c: 'T2'
            data: {
                //Origin is top left
                x: 0 | 1 | 2 | 3 | 4 | 5,
                y: 0 | 1 | 2 | 3
            }
        }
        export interface ICGameMapUpdate extends IWSAGameUpdate {
            c: 'T3'
            data: {
                map: [
                    [ number, number, number, number, number, number ],
                    [ number, number, number, number, number, number ],
                    [ number, number, number, number, number, number ],
                    [ number, number, number, number, number, number ],
                ],
                time: {
                    you: number,
                    opponent: number
                }
            }
        }
    }
}   