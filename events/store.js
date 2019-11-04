const StoreImplementation = require ('./store/http/index.js')

const Store = () => {
    this.init = async () => {
        this.queue = []
        this.store = StoreImplementation()
        return this.store.init(this.processQueue)
    }

    this.processQueue = () => {
        this.isReady = true
        this.queue.forEach(({action, event, data})=>{
            this[action](event, data)
        })
    }

    this.write = (event, data) => {
        if(!this.isReady){
            this.queue.push({action:'write', event, data})
            return
        }
        return this.store.write(event, data)
    }

    this.read = (event, data) => {
        if(!this.isReady){
            this.queue.push({action:'read', event, data})
            return
        }
        return this.store.read(event, data)
    }

    return this
}

module.exports = Store()
