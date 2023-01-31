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
// A = All (both ways)
// C = Clientbound
// S = Serverbound
// IWS[A|C|S][PacketName]

/**
 * Clientbound, sent on connect
 */
export interface IWSCInit extends IWSBasePacket {
    o: 1
    d: {
        uid: string
        version: number
    }
}
export interface IWSSBeginMatchmaking extends IWSBasePacket {
    o: 2
}
export interface IWSCMatchmakingUpdate extends IWSBasePacket {
    o: 2
    d: {
        seconds: number
    }
}
export interface IWSCGameFound extends IWSBasePacket {
    o: 3
}
export interface IWSAGameUpdate extends IWSBasePacket {
    o: 4
    d: any
}

export interface IWSCGameWin extends IWSBasePacket {
    o: 5
    d: {
        reason: winReasons
    }
}

export interface IWSCGameLose extends IWSBasePacket {
    o: 6
    d: {
        reason: loseReasons
    }
}