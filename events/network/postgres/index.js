const {Client} = require('pg')

const postgres = (network) => {
    this.init = () => {
        this.client = new Client({connectionString:'postgresql://postgres@localhost:5432/txst'})
        return new Promise((resolve, reject)=>{
            this.client.connect((error)=>{
                if(error){
                    reject(error)
                }else{
                    this.client.on('notification', (message) => {
                        const {event, data} = JSON.parse(message.payload)
                        network.emit(event, data)
                    })
                    this.client.query('LISTEN channel_1')
                    .then((data)=>{
                        resolve()
                    }).catch((err)=>{
                        reject()
                    })
                }
            })
        })
    }
    return this
}
module.exports = postgres
