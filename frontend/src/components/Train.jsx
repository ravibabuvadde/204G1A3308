import { useParams } from "react-router-dom";
import { Container, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const Train = (props) => {
  const { trains } = props;
  const { trainNumber } = useParams();
  const [train, setTrain] = useState({
    trainNumber: "",
    trainName: "",
    price: {
      sleeper: 0,
      AC: 0,
    },
    seatsAvailable: {
      sleeper: 0,
      AC: 0,
    },
    departureTime: {
      Hours: 0,
      Minutes: 0,
    },
    delayedBy: 0,
  });

  useEffect(() => {
    if (trains.length > 0) {
      const train = trains.find((train) => train.trainNumber === trainNumber);
      setTrain(train);
    } else {
      const data = axios
        .post("http://localhost:4000/trains/" + trainNumber)
        .then((res) => {
          setTrain(res.data);
        });
    }
  }, []);

  console.log(train);

  return (
    <Container fluid="md" className="my-5">
      <Table striped hover className="my-5">
        <tbody>
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
        </tbody>
      </Table>
    </Container>
  );
};

export default Train;
