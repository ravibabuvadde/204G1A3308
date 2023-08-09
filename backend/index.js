const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const API_URL = "http://20.244.56.144/train/trains";
// const API_URL = "http://localhost:3001/trains";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTE1NzA4MzcsImNvbXBhbnlOYW1lIjoiQmVzdCBUcmFpbiBDb21wYW55IiwiY2xpZW50SUQiOiI5YmI0YTU1Zi1iNWRiLTRkOWEtYTk2Yy1iYmRiMDJkNjk1YjAiLCJvd25lck5hbWUiOiIiLCJvd25lckVtYWlsIjoiIiwicm9sbE5vIjoiMjA0RzFBMzMwOCJ9.lEe-xLr1cWJLA2uB_1MWuW-R_mTW6MvMrrhfMs6YO9g";

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

app.post("/trains", async (req, res) => {
  const trains = await axios
    .get(API_URL, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data);
  const result = trains.filter(filterTrains).sort(sortTrains);

  res.json(result);
});

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(4000, () => {
  console.log("API is running on port 4000");
});
