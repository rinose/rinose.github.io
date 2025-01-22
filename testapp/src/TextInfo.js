import { ReactTyped } from "react-typed";


export default function TextInfo(props) {
  return (
      <div className="TextInfo">
        <ReactTyped strings={props.info} typeSpeed={10} />
      </div>
  );
}
