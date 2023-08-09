const express = require("express");

const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const filterTrains = (train) => {
  const currentDate = new Date();
  const currentHours = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();
  const currentSeconds = currentDate.getSeconds();
  const departureTime =
    train.departureTime.Hours * 60 +
    train.departureTime.Minutes +
    train.departureTime.Seconds / 60 +
    train.delayedBy;
  currentTime = currentHours * 60 + currentMinutes + currentSeconds / 60;
  return departureTime > currentTime + 30;
};

const sortTrains = (firstTrain, secondTrain) => {
  const firstTrainPrice = firstTrain.price.AC + firstTrain.price.sleeper;
  const secondTrainPrice = secondTrain.price.AC + secondTrain.price.sleeper;

  if (firstTrainPrice < secondTrainPrice) return -1;
  if (firstTrainPrice > secondTrainPrice) return 1;
  const firstTrainSeatsAvailable =
    firstTrain.seatsAvailable.AC + firstTrain.seatsAvailable.sleeper;
  const secondTrainSeatsAvailable =
    secondTrain.seatsAvailable.AC + secondTrain.seatsAvailable.sleeper;

  if (firstTrainSeatsAvailable > secondTrainSeatsAvailable) return -1;
  else if (firstTrainSeatsAvailable < secondTrainSeatsAvailable) return 1;

  const firstTrainDepartureTime =
    firstTrain.departureTime.Hours * 60 +
    firstTrain.departureTime.Minutes +
    firstTrain.departureTime.Seconds / 60 +
    firstTrain.delayedBy;
  const bDepartureTime =
    secondTrain.departureTime.Hours * 60 +
    secondTrain.departureTime.Minutes +
    firstTrain.departureTime.Seconds / 60 +
    secondTrain.delayedBy;

  return bDepartureTime - firstTrainDepartureTime;
};

const trains = [
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
      sleeper: 372,
      AC: 527,
    },
    delayedBy: 9,
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
      sleeper: 520,
      AC: 620,
    },
    delayedBy: 14,
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
      sleeper: 839,
      AC: 1839,
    },
    delayedBy: 17,
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
    trainName: "Patna Exp",
    trainNumber: "2340",
    departureTime: {
      Hours: 6,
      Minutes: 10,
      Seconds: 0,
    },
    seatsAvailable: {
      sleeper: 10,
      AC: 1,
    },
    price: {
      sleeper: 432,
      AC: 573,
    },
    delayedBy: 0,
  },
  {
    trainName: "Gandhinagar Exp",
    trainNumber: "2341",
    departureTime: {
      Hours: 7,
      Minutes: 15,
      Seconds: 0,
    },
    seatsAvailable: {
      sleeper: 15,
      AC: 5,
    },
    price: {
      sleeper: 457,
      AC: 690,
    },
    delayedBy: 1,
  },
  {
    trainName: "Delhi Exp",
    trainNumber: "2343",
    departureTime: {
      Hours: 9,
      Minutes: 45,
      Seconds: 0,
    },
    seatsAvailable: {
      sleeper: 32,
      AC: 1,
    },
    price: {
      sleeper: 487,
      AC: 1473,
    },
    delayedBy: 3,
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
      sleeper: 520,
      AC: 620,
    },
    delayedBy: 16,
  },
  {
    trainName: "Sikkim Exp",
    trainNumber: "2345",
    departureTime: {
      Hours: 11,
      Minutes: 23,
      Seconds: 0,
    },
    seatsAvailable: {
      sleeper: 4,
      AC: 4,
    },
    price: {
      sleeper: 711,
      AC: 1487,
    },
    delayedBy: 5,
  },
];

app.get("/trains", (req, res) => {
  const result = trains.filter(filterTrains).sort(sortTrains);

  res.json(result);
});

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(4000, () => {
  console.log("API is running on port 4000");
});
