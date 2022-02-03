import { CircularProgressWithLabel } from "./CircularProgressWithLabel";

const Clock: React.FC<{
  seconds: number;
  startCounter: () => void;
  totalSeconds: number;
}> = (props) => {
  const seconds = props.seconds;
  const secondsCircular = (seconds * 100) / props.totalSeconds;
  return (
    <div onClick={props.startCounter}>
      <CircularProgressWithLabel value={secondsCircular} seconds={seconds} />
    </div>
  );
};

export default Clock;
