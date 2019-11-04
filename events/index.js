const Network = require('./network.js')
const Store = require('./store.js')

const main = async () => {
    await Network.init()
    await Store.init()
    Network.on('createMessage', ({to, from, message}) => {
        if(to && from && message){
            return Store.write('createMessage', {to, from, message})
        }
        return new Error('Some information is missing');
    })
}

main()
