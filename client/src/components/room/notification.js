import { useEffect, useState } from "react";

const Notification = ({ socket }) => {
  const [notification, setNotification] = useState("");

  useEffect(() => {
    socket.on("received-notification", (message) => {
      setNotification(message);
      setTimeout(() => {
        setNotification();
      }, 5000);
    });
  }, []);

  if (!notification) return null;

  return <div className="notification">{notification}</div>;
};

export default Notification;
