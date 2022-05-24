import CreateRoomBtn from "./create_room_btn";
import RoomRow from "./room_row";

const Menu = (props) => {
  return (
    <div className="menu">
      <div className="card mt15 p15">Welcome</div>
      <div className="card mt20 p15">
        <div className="container">
          <p>Available Rooms</p>
          {props.rooms.map((room) => (
            <RoomRow key={room} name={room} socket={props.socket} />
          ))}
          <CreateRoomBtn socket={props.socket} />
        </div>
      </div>
    </div>
  );
};

export default Menu;
