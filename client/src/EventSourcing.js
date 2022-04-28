import React, {useEffect, useState} from 'react';
import axios from "axios";

const EventSourcing = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');

    useEffect(() => {
        const eventSource = new EventSource("http://localhost:5000/connect");
        eventSource.addEventListener("message", handleReceiveMessage);
        return () => {
            // Remove event listener and close the connection on unmount
            eventSource.removeEventListener("message", handleReceiveMessage);
            eventSource.close();
        };
    }, [])
    const handleReceiveMessage = function (event) {
        const message = JSON.parse(event.data);
        setMessages(prev => [message, ...prev]);
    }

    // const subscribe = async () => { //
    //     let eventSource = new EventSource(`http://localhost:5000/connect`)
    //     eventSource.onmessage = function (event) {
    //         const message = JSON.parse(event.data);
    //         setMessages(prev => [message, ...prev]);
    //     }
    // }


    const sendMessage = async () => {
        await axios.post('http://localhost:5000/new-messages', {
            message: value,
            id: Date.now()
        })
    }
    return (
        <div className={'center'}>
            <div className={'message-put'}>

                <div className={'column'}>
                    <input onChange={e => setValue(e.target.value)} value={value} type="text"/>
                    <button onClick={sendMessage}>Oтправить</button>
                </div>
            </div>
            <div className={'messages'}>
                {messages.map(mes =>
                    <div key={mes.id} className={'message'}>{mes.message}</div>)}
            </div>
        </div>
    );
};

export default EventSourcing;