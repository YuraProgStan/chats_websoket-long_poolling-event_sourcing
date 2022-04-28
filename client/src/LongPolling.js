import React, {useEffect, useState} from 'react';
import axios from "axios";

const LongPolling = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    useEffect(()=>{
        subscribe()
    }, [])

    const subscribe = async () => {
        try {
            const {data} = await axios.get('http://localhost:5000/get-messages');
            setMessages(prev => [data, ...prev]);
            setValue('');
           await subscribe()

        } catch (e) {
            setTimeout(()=>{
                subscribe()
            },1000)
        }
    }

    const sendMessage = async () => {
        await axios.post('http://localhost:5000/new-messages', {
            message: value,
            id: Date.now()
        });

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

export default LongPolling;