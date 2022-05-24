import Chat from "../chat/chat";
import Board from "./board";

const Game = (props) => {
  return (
    <div className="grid">
      <Board />
      <Chat socket={props.socket} />
    </div>
  );
};

export default Game;
