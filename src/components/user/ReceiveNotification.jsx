// ReceiveNotification.js
import React, { useState, useEffect } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { UserNavbar } from '../../UserNavbar';
export const ReceiveNotification = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const client = new W3CWebSocket('wss://abhimanew.live/ws/notification/');
        
        client.onopen = () => {
            console.log('WebSocket Client Connected');
            // Send request to fetch notifications
            client.send(JSON.stringify({ action: 'fetch_notifications' }));
        };

        client.onmessage = (message) => {
            const data = JSON.parse(message.data);
            if (data.notifications) {
                setNotifications(data.notifications);
            }
        };

        return () => {
            client.close();
        };
    }, []);

    return (
        <>
        <UserNavbar/>
        <div className='mx-40 mt-20'>
            <h1 className='text-2xl uppercase font-bold text-gray-700'>Notifications</h1>
            <ul className='m-10 text-lg'>
                {notifications.map((notification, index) => (
                    <li className='bg-blue-50 my-3 border border-gray-200 py-5 px-10 rounded-xl' key={index}> <i className="fas fa-bell text-white p-2 bg-blue-950 rounded-full"></i>   {notification}</li>
                ))}
            </ul>
        </div>
        </>
    );
};
