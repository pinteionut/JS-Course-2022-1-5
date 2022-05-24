import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import Menu from "./components/menu/menu";
import Room from "./components/room/room";

function App() {
  const [connectedSocket, setConnectedSocket] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    const socket = io();

    socket.on("connected", () => {
      setConnectedSocket(socket);
    });

    socket.on("data", (receivedData) => {
      setData(receivedData);
    });
  }, []);

  const content = () => {
    // Render Nothing if socket or data is missing
    if (!(connectedSocket && data)) return null;

    const { room } = data;

    if (room === "menu")
      return <Menu socket={connectedSocket} rooms={data.availableRooms} />;

    return <Room {...room} socket={connectedSocket} />;
  };

  return <div className="container">{content()}</div>;
}

export default App;
