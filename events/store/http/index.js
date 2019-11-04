const axios = require('axios')

const URL = `http://localhost:${process.env.PORT}`

const http = () => {
    this.init = (callback) => callback()

    this.write = (event, data) => {
        return axios.post(URL, {event, data})
    }

    this.read = (event, data) => {

    }

    return this
}
module.exports = http
