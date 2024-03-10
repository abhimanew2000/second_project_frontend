import React, { useState, useEffect } from "react";
import axios from "../../Utils/axios";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useSelector } from "react-redux";
import { selectAdminId } from "../../redux/store";
import { jwtDecode } from "jwt-decode";
import { baseUrl } from "../../Utils/urls";
export const AdminChatComponent = () => {
  const [message, setMessage] = useState("");

  const [chatMessages, setChatMessages] = useState([]);
  const [selectedSender, setSelectedSender] = useState(null);
  const [Messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [hotelDetails, setHotelDetails] = useState(null);

  const [client, setClient] = useState(null);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const adminToken = useSelector((state) => state.admin.token);
  const admin = jwtDecode(adminToken);
  const adminId = admin.user_id;

  

    const fetchChatMessages = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}chat/messages/`
        );
        setChatMessages(response.data);
        console.log(response.data,"datttttt")
        

      } catch (error) {
        console.error("Error fetching chat messages:", error);
      }
    };

  

  useEffect(() => {
    fetchChatMessages();

  }, [])

  const handlefetch =(bookingId)=>{
    if (!bookingId) return;

  }


  const connectToWebSocket = (bookingId) => {
    if (!bookingId) return;

    const newClient = new W3CWebSocket(
      `wss://abhimanew.live/ws/chat/${bookingId}/`
      //  `ws://localhost:8000/ws/chat/${bookingId}/`
    );
    setClient(newClient);

    newClient.onopen = () => {
      console.log("WebSocket Client Connected");
    };


    newClient.onmessage = (message) => {
      const data = JSON.parse(message.data);
      console.log("Received message:", data);
      console.log("Current filteredMessages state:", filteredMessages);

      
      setFilteredMessages((prevMessages) => [...prevMessages, data.message]);
      console.log("Updated filteredMessages state:", filteredMessages);
      fetchChatMessages()
      handlefetch(bookingId)
    };
  };
  console.log('1111111111111111111',filteredMessages)

 
  
  
  

  const sendMessage = () => {
    if (message.trim() === "" || !client) return;

    const timestamp = new Date().toISOString(); // Get current timestamp
    const messageData = {
      message: message,
      sender: adminId, // Set the sender to the user ID
      timestamp: timestamp,
      booking: selectedBooking, // Set the booking ID
    };
    setFilteredMessages((prevMessages) => [...prevMessages, messageData]);

    client.send(JSON.stringify(messageData));

    // Clear the message input
    setMessage("");
  };

  const handleBookingClick = (booking_id) => {
    setSelectedBooking(booking_id);
    console.log("Clicked on sender's name. Booking ID:", booking_id);
    const userMessages = chatMessages.filter(
      (message) => message.booking_id === booking_id
    );
    setFilteredMessages(userMessages);

    connectToWebSocket(booking_id);
    fetchHotelDetails(booking_id);
  };

  const fetchHotelDetails = async (bookingId) => {
    try {
      const response = await axios.get(
        `/chat/hotel-details/${bookingId}/`
      );
      setHotelDetails(response.data);
      console.log(response.data, "dataaaa");
    } catch (error) {
      console.error("Error fetching hotel details:", error);
    }
  };

  return (
    <div class="container mx-auto shadow-lg rounded-lg">
      <div class="px-5 py-5 flex justify-between items-center bg-white border-b-2">
        <div class="font-semibold text-2xl">GoingChat</div>
        
        <div class="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center">
          RA
        </div>
      </div>

      <div class="flex flex-row justify-between bg-white">
        <div class="flex flex-col w-2/5 border-r-2 overflow-y-auto">
          <div class="border-b-2 py-4 px-2">
            <input
              type="text"
              placeholder="search chatting"
              class="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
            />
          </div>

          <div class="flex flex-row py-4 px-2 justify-center items-center border-b-2">
            <div class="w-1/4">
              {/* <img
                src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
                class="object-cover h-12 w-12 rounded-full"
                alt=""
              /> */}
            </div>
            <div className="w-full">
            {chatMessages.map((message, index) => {
    if (message.sender__name !== 'admin') {
        // Check if the current message has the same sender as the previous one
        const previousMessage = chatMessages[index - 1];
        const sameSenderAsPrevious = previousMessage && previousMessage.sender__name === message.sender__name;
        
        // If the sender is different from the previous message, render the sender's name
        if (!sameSenderAsPrevious) {
            return (
                <div key={message.id} className="flex flex-col mb-4">
                    <div className="text-lg font-semibold" onClick={() => handleBookingClick(message.booking_id)}>
                        {message.sender__name}
                    </div>
                    <span className="text-gray-500">{message.message}</span>
                </div>
            );
        } else {
            // If the sender is the same as the previous message, render only the message
            return (
                <div key={message.id} className="flex flex-col mb-4">
                    {/* <span className="text-gray-500">{message.message}...</span> */}
                </div>
            );
        }
    }
    return null; // Skip rendering if the sender is 'admin'
})}
            </div>
          </div>
        </div>

        <div class="w-full px-5 flex flex-col justify-between">
          <div class="flex flex-col mt-5"></div>
          <div class="py-5">
          {filteredMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)).map((msg, index) => (
    <div key={index} className="flex flex-col mb-4">
      <div className="text-lg font-semibold">
        {msg.sender__name}
      </div>
      <span className="text-gray-500">
        {msg.message}
      </span>
    </div>
  ))}


            <input
              class="w-full bg-gray-300 py-5 px-3 rounded-xl"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="type your message here..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
        {hotelDetails && hotelDetails.image && (

        <div class="w-2/5 border-l-2 px-5">
          <div class="flex flex-col">
            {/* {hotelDetails && hotelDetails.image && ( */}
              <div class="font-semibold text-xl py-4">
                {hotelDetails.name}
                <img
                  src={`https://abhimanew.live${hotelDetails.image}`}
                  alt="Hotel"
                  className="object-cover rounded-xl h-64"
                />
              </div>
            {/* )} */}

            <div class="font-semibold py-4">{hotelDetails.name}</div>
            <div class="font-light">
              {/* <img src={hotelDetails.image} alt="Hotel" className="object-cover rounded-xl h-64" /> */}
            </div>
          </div>
        </div>
                    )}

      </div>
    </div>
  );
};
