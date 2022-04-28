const ws = require('ws');

const wss = new ws.Server({
    port: 5000,
}, () => console.log(`Server started on 5000`))


wss.on('connection', function connection(websocket) {
    websocket.on('message', function (message) {
        message = JSON.parse(message)
        switch (message.event) {
            case 'message':
                allUsersMessage(message)
                break;
            case 'connection':
                broadcastMessageExcludeOwner(message)
                break;
        }
    })
    function allUsersMessage(message) {
        wss.clients.forEach(client => {
            client.send(JSON.stringify(message))
        })
    }

    function broadcastMessageExcludeOwner(message) {
        wss.clients.forEach(client => {
            if (client !== websocket && client.readyState === ws.OPEN) {
                client.send(JSON.stringify(message))
            }
        })
    }

})

