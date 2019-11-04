const fs = require('fs')


const fileSystem = (network) => {
    this.init = () => {
        fs.watch(`${__dirname}/../../watch-directory`, (eventType, fileName) => {
            if(fileName){
                if(eventType==='change'){
                    const {event, data} = JSON.parse(fileName)
                    network.emit(event, data)

                }
            }
        })
    }
    
    return this
}

module.exports = fileSystem
