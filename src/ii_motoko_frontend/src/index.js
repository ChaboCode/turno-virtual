import exp from 'constants'
import express from 'express'
import { createServer } from 'http'
import { WebSocketServer } from 'ws'

const app = express()
const server = createServer(app)
const wss = new WebSocketServer({
    server
})

const __dirname = import.meta.dirname;
app.get('/user', (req, res) => {
    res.sendFile(__dirname + '/user.html')
})

app.get('/casher', (req, res) => {
    res.sendFile(__dirname + '/casher.html')
})

let id = 1
const turns = []
let sockets = []
let cashiers = []

function updateCashiers() {
    cashiers.forEach(ws => ws.send(JSON.stringify(turns)))
}

function nextTurn() {
    const inTurn = turns.shift()
    cashiers.forEach(ws => ws.send(JSON.stringify({
        type: 'inTurn',
        inTurn
    })))
    updateCashiers()
}

wss.on('connection', socket => {
    console.log('new connection')
    sockets.push(socket)
    socket.on('error', console.error)

    socket.on('message', message => {
        const req = JSON.parse(message)
        switch (req.type) {
            case 'cashier':
                if (req.op === 'con') {
                    console.log('cashier login')
                    cashiers.push(socket)
                } else if (req.op === 'next') {
                    nextTurn()
                }

                break
            case 'turn':
                turns.push({
                    id,
                    name: req.name
                })
                id++
                updateCashiers()
                break
        }
    })

    socket.on('close', () => {
        sockets = sockets.filter(s => s !== socket)
    })
})

server.listen(8080, () => console.log("XD"))
