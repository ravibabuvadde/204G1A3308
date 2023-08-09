const Train = (props) => {
  const { trains } = props;
  const trainNumber = props.match.params.trainNumber;
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
