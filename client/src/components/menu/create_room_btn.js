import { useEffect, useState } from "react";

const CreateRoomBtn = ({ socket }) => {
  const [roomName, setRoomName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    socket.on("create-room-error", (message) => {
      setError(message);
    });
  });

  const handleChange = (e) => {
    setError("");
    setRoomName(e.target.value);
  };

  const createRoom = () => {
    if (!roomName.length) {
      setError("Please enter a name");
    } else {
      socket.emit("create-room", roomName);
    }
  };

  return (
    <>
      <div className="d-flex mt20">
        <div className="text-input-container">
          <input
            value={roomName}
            type="text"
            className="text-input"
            placeholder="Room Name"
            onChange={handleChange}
          ></input>
        </div>
        <button onClick={createRoom}>Create</button>
      </div>
      {error ? <p className="error">{error}</p> : null}
    </>
  );
};

export default CreateRoomBtn;
