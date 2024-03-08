import React, { useState } from 'react';
import axios from '../../Utils/axios';;

import { useSelector } from 'react-redux';
export const NotificationForm = () => {

    const [notificationMessage, setNotificationMessage] = useState('');
    const adminToken = useSelector((state) => state.admin.token);


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await axios.post(
                '/notification/send-notification/',
                { notification_message: notificationMessage },
                {
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
                        "Content-Type": "application/json", // Update content type if necessary
                    },
                }
            );
            setNotificationMessage('');
        } catch (error) {
            console.error('Error sending notification:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={notificationMessage}
                onChange={(e) => setNotificationMessage(e.target.value)}
                placeholder="Enter notification message..."
                required
            />
            <button type="submit">Send Notification</button>
        </form>
    );
};
