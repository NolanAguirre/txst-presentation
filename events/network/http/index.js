const express = require('express')
const bodyParser = require('body-parser')


const http = (network) => {
    this.init = () => {
        const app = express()
        app.use(bodyParser.json())
        app.post('/message', async (req, res) => {
            const response = await network.emit('createMessage', req.body)
            res.json(response)
        })
        app.listen(process.env.PORT || 3030)
    }

    return this
}

module.exports = http
