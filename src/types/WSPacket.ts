export interface IWSBasePacket {
    o: number,
    d?: any
}

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