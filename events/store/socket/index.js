const WebSocket = require('ws')


const socket = () => {
    this.init = (callback) => {
        this.ws = new WebSocket(`ws://localhost:${process.env.PORT || 3030}`)
        this.ws.on('open', () => callback())
    }

    this.write = (event, data) => {
        this.ws.send(JSON.stringify({event, data}))
    }

    this.read = (event, data) => {

    }

    return this
}

module.exports = socket
