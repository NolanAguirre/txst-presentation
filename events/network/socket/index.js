const WebSocket = require('ws');

const socket = (network) => {
    this.init = () => {
        this.wss = new WebSocket.Server({host:'localhost', port:process.env.PORT || 3030})
        this.wss.on('connection', (ws, request)=>{
            ws.on('message', (req)=>{
                const {event, data} = JSON.parse(req)
                network.emit(event, data)
            })
        })
    }

    return this
}

module.exports = socket
