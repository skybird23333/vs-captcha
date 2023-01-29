import express from 'express'
import expressWs from 'express-ws'
import { WSHandler } from './struct/WSHandler'

const app = express()

const expressWsInstance = expressWs(app)

expressWsInstance.app.ws('/ws', (ws, req) => {
    new WSHandler(ws)
})

app.listen(3000)
console.log('ready')