import { useEffect, useState } from "react";
import ChatBox from "./chatbox";
import MessageForm from "./message_form";
// import Notification from "../notification";

const Chat = ({ socket }) => {
  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {
    setMessages((messages) => {
      return [...messages, message];
    });
  };

  useEffect(() => {
    socket.on("received-message", (message) => {
      addMessage(message);
    });
  }, []);

  return (
    <div className="chat-container">
      {/* <Notification socket={socket} /> */}
      <ChatBox messages={messages} />
      <MessageForm socket={socket} />
    </div>
  );
};

export default Chat;
