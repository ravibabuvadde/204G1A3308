import { useParams } from "react-router-dom";
import { Container, Table } from "react-bootstrap";

const Train = (props) => {
  const { trains } = props;
  const { trainNumber } = useParams();
  const train = trains.find((train) => train.trainNumber === trainNumber);
  return (
    <Container fluid="md" className="my-5">
      <Table striped hover className="my-5">
        <tr>
          <th>Train Number</th>
          <td>{train.trainNumber}</td>
        </tr>
        <tr>
          <th>Train Name</th>
          <td>{train.trainName}</td>
        </tr>
        <tr>
          <th>Price</th>
          <td>
            Sleeper: {train.price.sleeper}
            <br />
            AC: {train.price.AC}
          </td>
        </tr>
        <tr>
          <th>Seats Available</th>
          <td>
            Sleeper: {train.seatsAvailable.sleeper}
            <br />
            AC: {train.seatsAvailable.AC}
          </td>
        </tr>
        <tr>
          <th>Departure Time</th>
          <td>
            {train.departureTime.Hours}:
            {train.departureTime.Minutes < 10
              ? "0" + train.departureTime.Minutes
              : train.departureTime.Minutes}
          </td>
        </tr>
        <tr>
          <th>Delayed By</th>
          <td className={train.delayedBy > 10 ? "bg-danger text-white" : ""}>
            {train.delayedBy} minutes
          </td>
        </tr>
      </Table>
    </Container>
  );
};

export default Train;
