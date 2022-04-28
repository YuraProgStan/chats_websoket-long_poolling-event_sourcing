const express = require('express');
const cors = require('cors');
const events = require('events')
const {response} = require("express");
const PORT = 5000;

const emitter = new events.EventEmitter();
emitter.setMaxListeners(0)
const app = express()
// let clients = [];
app.use(cors())
app.use(express.json())

app.get('/connect', (req, res) => {
    res.writeHead(200, {
        'Connection': 'keep-alive',
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
    })
    emitter.on('newMessage', (message) => {
    res.write(`data: ${JSON.stringify(message)}\n\n`)
        // const clientId = Date.now();
        //
        // const newClient = {
        //     id: clientId,
        //     res
        // };
        //
        // clients.push(newClient);
        //
        // req.on('close', () => {
        //     console.log(`${clientId} Connection closed`);
        //     clients = clients.filter(client => client.id !== clientId);
        // });
    })
})

app.post('/new-messages', ((req, res) => {
    const message = req.body;
    emitter.emit('newMessage', message)
    res.status(200).end();
}))


app.listen(PORT, () => console.log(`server started on port ${PORT}`))