import { useEffect } from "react";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
const TrainsList = () => {
  const [trains, setTrain] = useState([]);

  useEffect(() => {
    setTrain([
      {
        trainName: "Bokaro Exp",
        trainNumber: "2347",
        departureTime: {
          Hours: 13,
          Minutes: 32,
          Seconds: 0,
        },
        seatsAvailable: {
          sleeper: 55,
          AC: 0,
        },
        price: {
          sleeper: 208,
          AC: 398,
        },
        delayedBy: 7,
      },
      {
        trainName: "Lucknow Exp",
        trainNumber: "2347",
        departureTime: {
          Hours: 17,
          Minutes: 33,
          Seconds: 0,
        },
        seatsAvailable: {
          sleeper: 5,
          AC: 1,
        },
        price: {
          sleeper: 270,
          AC: 393,
        },
        delayedBy: 12,
      },
      {
        trainName: "Panjim Exp",
        trainNumber: "2349",
        departureTime: {
          Hours: 13,
          Minutes: 32,
          Seconds: 0,
        },
        seatsAvailable: {
          sleeper: 2,
          AC: 1,
        },
        price: {
          sleeper: 287,
          AC: 452,
        },
        delayedBy: 9,
      },
      {
        trainName: "Chennai Exp",
        trainNumber: "2344",
        departureTime: {
          Hours: 21,
          Minutes: 35,
          Seconds: 0,
        },
        seatsAvailable: {
          sleeper: 3,
          AC: 1,
        },
        price: {
          sleeper: 380,
          AC: 500,
        },
        delayedBy: 15,
      },
      {
        trainName: "Mysore Exp",
        trainNumber: "2347",
        departureTime: {
          Hours: 13,
          Minutes: 32,
          Seconds: 0,
        },
        seatsAvailable: {
          sleeper: 2,
          AC: 2,
        },
        price: {
          sleeper: 510,
          AC: 643,
        },
        delayedBy: 8,
      },
      {
        trainName: "Amritsar Exp",
        trainNumber: "2346",
        departureTime: {
          Hours: 19,
          Minutes: 0,
          Seconds: 0,
        },
        seatsAvailable: {
          sleeper: 15,
          AC: 10,
        },
        price: {
          sleeper: 495,
          AC: 695,
        },
        delayedBy: 13,
      },
      {
        trainName: "Kolkata Exp",
        trainNumber: "2345",
        departureTime: {
          Hours: 20,
          Minutes: 15,
          Seconds: 0,
        },
        seatsAvailable: {
          sleeper: 16,
          AC: 70,
        },
        price: {
          sleeper: 580,
          AC: 680,
        },
        delayedBy: 14,
      },
      {
        trainName: "Mumbai Exp",
        trainNumber: "2343",
        departureTime: {
          Hours: 22,
          Minutes: 37,
          Seconds: 0,
        },
        seatsAvailable: {
          sleeper: 8,
          AC: 15,
        },
        price: {
          sleeper: 610,
          AC: 710,
        },
        delayedBy: 16,
      },
      {
        trainName: "Cochin Exp",
        trainNumber: "2348",
        departureTime: {
          Hours: 15,
          Minutes: 55,
          Seconds: 0,
        },
        seatsAvailable: {
          sleeper: 1,
          AC: 0,
        },
        price: {
          sleeper: 662,
          AC: 949,
        },
        delayedBy: 11,
      },
      {
        trainName: "Srinagar Exp",
        trainNumber: "2349",
        departureTime: {
          Hours: 14,
          Minutes: 55,
          Seconds: 0,
        },
        seatsAvailable: {
          sleeper: 1,
          AC: 0,
        },
        price: {
          sleeper: 957,
          AC: 1044,
        },
        delayedBy: 10,
      },
      {
        trainName: "Hyderabad Exp",
        trainNumber: "2341",
        departureTime: {
          Hours: 23,
          Minutes: 55,
          Seconds: 0,
        },
        seatsAvailable: {
          sleeper: 6,
          AC: 7,
        },
        price: {
          sleeper: 554,
          AC: 1854,
        },
        delayedBy: 5,
      },
      {
        trainName: "Pune Exp",
        trainNumber: "2342",
        departureTime: {
          Hours: 23,
          Minutes: 0,
          Seconds: 0,
        },
        seatsAvailable: {
          sleeper: 6,
          AC: 7,
        },
        price: {
          sleeper: 749,
          AC: 1749,
        },
        delayedBy: 17,
      },
    ]);
  }, []);

  return (
    <Container fluid="md" className="my-5">
      <h2>Trains List</h2>

      <Table striped bordered hover className="my-5">
        <thead>
          <tr>
            <th>#</th>
            <th>Train Number</th>
            <th>Train Name</th>
            <th>Price</th>
            <th>Seats Available</th>
            <th>Departure Time</th>
            <th>Delayed By</th>
          </tr>
        </thead>
        <tbody>
          {trains.map((train, index) => (
            // onclick table row, redirect to /train/:trainNumber
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{train.trainNumber}</td>
              <td>{train.trainName}</td>
              <td>
                Sleeper: {train.price.sleeper}
                <br />
                AC: {train.price.AC}
              </td>
              <td>
                Sleeper: {train.seatsAvailable.sleeper}
                <br />
                AC: {train.seatsAvailable.AC}
              </td>
              <td>
                {train.departureTime.Hours}:
                {train.departureTime.Minutes < 10
                  ? "0" + train.departureTime.Minutes
                  : train.departureTime.Minutes}
              </td>
              <td
                className={train.delayedBy > 10 ? "bg-danger text-white" : ""}
              >
                {train.delayedBy} minutes
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default TrainsList;
