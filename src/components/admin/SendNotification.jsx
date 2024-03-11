import React, { useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { useSelector } from 'react-redux';
import { AdminSidebar } from './AdminSidebar';
export const SendNotification = () => {
    const [notificationMessage, setNotificationMessage] = useState('');
    const adminToken = useSelector((state) => state.admin.token);

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Initialize WebSocket client
        const client = new W3CWebSocket('wss:/abhimanew.live/ws/notification/room_name/');
        //  const client = new W3CWebSocket('ws://localhost:8000/ws/notification/room_name/');
    
        client.onopen = () => {
            console.log('WebSocket Client Connected');
    
            // Once connected, send the notification message
            client.send(JSON.stringify({ message: notificationMessage }));
        };
    
        client.onmessage = (message) => {
            const notificationData = JSON.parse(message.data);
            console.log('Received notification:', notificationData);
            // Handle received notifications as needed
        };
    };
    
    return (
        <>
        <div className='flex'>
            <AdminSidebar/>
            <div className='flex justify-center items-center bg-gradient-to-r from-blue-500 to-blue-600 w-full'>
                
                    <form onSubmit={handleSubmit} className='bg-white p-10 rounded-xl'>
                        <h1 className='text-center font-bold text-gray-700 text-lg'> Send Notification</h1>
                        <div className=' '>

                            <textarea
                                className='w-80 pt-2'
                                value={notificationMessage}
                                onChange={(e) => setNotificationMessage(e.target.value)}
                                placeholder="Enter notification message..."
                                required
                            />
                        </div>
                        <div className='flex justify-center'>
                            <button className='w-fit bg-green-500 text-white p-2 rounded-lg' type="submit">Send Notification</button>
                        </div>
                    </form>

            
            </div>
        </div>
        </>
    );
};
