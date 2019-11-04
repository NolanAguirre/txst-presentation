const fs = require('fs')

const fileSystem = () => {
    this.init = (callback) => callback()

    this.write = (event, data) => {
        return fs.writeFile(`${__dirname}/../../write-directory/${event}/${new Date().getTime()}`, JSON.stringify(data, null, 2), ()=>{})
    }

    this.read = (event, data) => {

    }

    return this
}
module.exports = fileSystem
