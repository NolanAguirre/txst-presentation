const fero = require('fero')

const distributedSystem = (network) => {
    this.createMessage = (req) => {
        network.emit('createMessage', req.value.value)
    }

    this.init = () => {
        this.chat = fero('chat', async (req, cache) => {
            switch (req.value.type) {
                case "createMessage":
                    return this.createMessage(req);
                default:
                    return "Method Not Allowed";
            }
        })
    }

    return this
}

module.exports = distributedSystem
