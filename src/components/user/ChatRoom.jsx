import React, { useState, useEffect } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const ChatRoom = ({ roomName, username }) => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const client = new W3CWebSocket(`wss://abhimanew.live/ws/chat/${roomName}/`);
    // const client = new W3CWebSocket(`ws://localhost:8000/ws/chat/${roomName}/`);

    useEffect(() => {
        client.onopen = () => {
            console.log('WebSocket Client Connected');
        };

        client.onmessage = (message) => {
            const data = JSON.parse(message.data);
            setMessages(prevMessages => [...prevMessages, { message: data.message, username: data.username }]);
        };

        return () => {
            client.close();
        };
    }, []);

    const handleMessageChange = (e) => {
        setInputMessage(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        client.send(JSON.stringify({ message: inputMessage, username: username }));
        setInputMessage('');
    };

    return (
        <div>
            <h1>Chat Room: {roomName}</h1>
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.username}: </strong>{msg.message}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={inputMessage} onChange={handleMessageChange} />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default ChatRoom;
