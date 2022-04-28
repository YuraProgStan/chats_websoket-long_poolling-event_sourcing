const express = require('express');
const events = require('events');
const cors = require('cors');

const emitter = new events.EventEmitter();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}...`))

app.get('/get-messages', (req, res) => {
    emitter.once('message', (message) => {
        return res.json(message)
    })
})

app.post('/new-messages', (req, res) => {
    const message = req.body;
    console.log(message);
    emitter.emit('message', message);
    return res.status(200).end();
})