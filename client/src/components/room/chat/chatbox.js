import Message from "./message";

const ChatBox = ({ messages }) => {
  return (
    <div className="chat-card">
      {messages.map((message, index) => (
        <Message message={message} key={`message-${index}`} />
      ))}
    </div>
  );
};

export default ChatBox;
