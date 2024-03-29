import React, { useState, useEffect } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Correct import statement
import axios from "../../Utils/axios";
import { baseUrl } from "../../Utils/urls";

const ChatComponent = () => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [client, setClient] = useState(null);
  const { bookingId } = useParams();
  const [hotelImage, setHotelImage] = useState("");
  const [hotelName, setHotelName] = useState("");

  const storedUserId = localStorage.getItem("usertoken");
  const userId = jwtDecode(storedUserId);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}hotel/booking/hotel-details/${bookingId}`
        );
        const { hotel } = response.data; // Assuming the hotel information is nested under the 'hotel' key
        setHotelImage(hotel.image); // Assuming 'image' is the field containing the hotel image URL
        setHotelName(hotel.name);
        console.log(hotelImage);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  useEffect(() => {
    connectToWebSocket(bookingId);

    return () => {
      if (client) {
        client.close();
      }
    };
  }, [bookingId]);

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
      console.log(message.data, "data");
      console.log("Received message:", data.message);

      setChatMessages((prevMessages) => [
        ...prevMessages,
        { message: data.message, sender: data.sender },
      ]);
      console.log(chatMessages, "cha");
    };
  };

  const sendMessage = () => {
    if (message.trim() === "" || !client) return;

    const timestamp = new Date().toISOString(); // Get current timestamp
    const messageData = {
      message: message,
      sender: userId.user_id, // Set the sender to the user ID
      timestamp: timestamp,
      booking: bookingId, // Set the booking ID
    };

    client.send(JSON.stringify(messageData));

    setMessage("");
  };
  return (
    <>
      <div class="flex h-screen antialiased text-gray-800">
        <div class="flex flex-row h-full w-full overflow-x-hidden">
          <div class="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
            <div class="flex flex-row items-center justify-center h-12 w-full">
              <div class="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  ></path>
                </svg>
              </div>
              <div class="ml-2 font-bold text-2xl">QuickChat</div>
            </div>
            <div class="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
              <div class="h-20 w-20 rounded-full border overflow-hidden">
                <img src={`${baseUrl}media/${hotelImage}`} alt="Avatar" class="h-full w-full" />
              </div>
              <div class="text-sm font-semibold mt-2">{hotelName}</div>
              <div class="text-xs text-gray-500"></div>
              <div class="flex flex-row items-center mt-3">
                <div class="flex flex-col justify-center h-4 w-8 bg-indigo-500 rounded-full">
                  <div class="h-3 w-3 bg-white rounded-full self-end mr-1"></div>
                </div>
                <div class="leading-none ml-1 text-xs">Active</div>
              </div>
            </div>

            <div class="flex flex-col mt-8">
              <div class="flex flex-row items-center justify-between text-xs">
                <span class="font-bold">Active Conversations</span>
                <span class="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                  4
                </span>
              </div>
              <div class="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
                <button class="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                  <div class="h-10 w-10 rounded-full border overflow-hidden">
                    <img
                      src={`${baseUrl}media/${hotelImage}`}
                      alt="Admin"
                      class="h-full w-full"
                    />
                    <img src="" alt="Avatar" class="h-full w-full" />
                  </div>
                  <div class="ml-2 text-sm font-semibold">
                    {hotelName}
                    <div className="small"></div>
                  </div>

                  <div class="flex items-center justify-center ml-auto text-xs text-white bg-red-500 "></div>
                </button>
              </div>
            </div>
          </div>
          <div class="flex flex-col flex-auto h-full p-6">
            <div class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
              <div class="flex flex-col h-full overflow-x-auto mb-4">
                <div class="flex flex-col h-full">
                  {chatMessages.map((msg, index) => (
                    <div key={index} className="grid grid-cols-12 gap-y-2">
                      {msg.sender === 1 ? (
                        <div className="col-start-1 col-end-8 p-3 rounded-lg">
                          <div className="flex flex-row items-center">
                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                              <img
                                src={`${baseUrl}media/${hotelImage}`}
                                alt="Admin"
                                class="h-10 w-10 "
                              />
                            </div>
                            <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                              <div>{msg.message}</div>{" "}
                              {/* Display the message content */}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="col-start-6 col-end-13 p-3 rounded-lg">
                          <div className="flex items-center justify-start flex-row-reverse">
                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                              B
                            </div>
                            <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                              <div>{msg.message}</div>{" "}
                              {/* Display the message content */}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div class="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                <div>
                  <button class="flex items-center justify-center text-gray-400 hover:text-gray-600">
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div class="flex-grow ml-4">
                  <div class="relative w-full">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                    />
                    <button class="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                      <svg
                        class="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="ml-4">
                  <button
                    onClick={sendMessage}
                    class="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                  >
                    <span>Send</span>
                    <span class="ml-2">
                      <svg
                        class="w-4 h-4 transform rotate-45 -mt-px"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* -------------- */}
    </>
  );
};

export default ChatComponent;
