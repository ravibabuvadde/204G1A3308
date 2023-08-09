import { useParams } from "react-router-dom";

const Train = (props) => {
  const { trains } = props;
  const { trainNumber } = useParams();
  return (
    <div>
      <h1>Train</h1>

      {trains.map((train) => {
        <div>
          <h1>Train</h1>
          <h2>{trainNumber}</h2>
        </div>;
      })}
    </div>
  );
};

export default Train;
