const {Client} = require('pg')

const format = {
    createMessage:({to, from, message}) => {
        return  `insert into txst.messages("from", "to", message) values ('${from}','${to}','${message}')`
    }
}

const postgres = (network) => {
    this.init = (callback) => {
        this.client = new Client({connectionString:'postgresql://postgres@localhost:5432/txst'})
        return this.client.connect().then((data)=>{
            callback()
        })
    }

    this.write = (event, data) => {
        return this.client.query(format[event](data))
    }

    this.read = (event, data) => {

    }

    return this
}
module.exports = postgres
