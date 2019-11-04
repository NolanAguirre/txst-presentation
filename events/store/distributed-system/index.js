const fero = require('fero')

const distributedSystem = (network) => {
    this.init = async (callback) => {
        this.chat = await fero('chat', {
            client: true
        })
        await this.chat.on('connected')
        callback()
    }

    const write = (event, data) => {
        this.chat.add({
            type:event,
            value: data
        })
    }

    const read = () => {
        //who needs to read
    }

    return {
        init,
        read,
        write
    }
}

module.exports = distributedSystem
