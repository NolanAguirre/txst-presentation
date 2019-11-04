const NetworkImplementation = require ('./network/file-system/index.js')

const Network = () => {
    this.emitter = {}
    this.init = async () => {
        this.network = await NetworkImplementation(this)
        return await this.network.init()
    }

    this.on = (event, callback) => {
        this.emitter[event] = callback
    }

    this.emit = (event, args) => {
        if(this.emitter[event]){
            return this.emitter[event](args)
        }
    }
    return this
}

module.exports = Network()
