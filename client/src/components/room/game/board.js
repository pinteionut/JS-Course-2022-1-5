import BoardLines from "../../../metadata/board_lines";
import EmptyNodes from "../../../metadata/empty_nodes";
import "./board.css";
import EmptyNode from "./empty_node";

const Board = (props) => (
  <>
    <div className="overlay">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width={534}
        height={534}
        viewBox="0 0 1417 1418"
      >
        <image x={8} y={9} width={1405} height={1404} xlinkHref={BoardLines} />

        {EmptyNodes.map((emptyNode, index) => {
          return <EmptyNode key={index} {...emptyNode} />;
        })}
      </svg>
    </div>
  </>
);

export default Board;
