const express = require("express");
const axios = require("axios");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

console.log(process.env.API_URL);

const API_URL = process.env.API_URL;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

let token = "";

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

const fetchToken = async () => {
  const response = await axios.post("http://20.244.56.144/train/auth", {
    companyName: "Best Train Company",
    clientID: "9bb4a55f-b5db-4d9a-a96c-bbdb02d695b0",
    ownerName: "Ravi Babu V C",
    ownerEmail: "204g1a3308@srit.ac.in",
    clientSecret: "hHLITWJcJKzJsRPe",
    rollNo: "204G1A3308",
  });
  // console.log(response.data);
  return response.data.access_token;
};

const fetchTrains = async (token) => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
};

app.post("/trains", async (req, res) => {
  if (token === "") {
    token = await fetchToken();
  }
  let trains = await fetchTrains(token);

  if (trains.length === 0 && trains.message) {
    token = await fetchToken();
    trains = await fetchTrains(token);
  }

  const result =
    trains.length > 0 ? trains.filter(filterTrains).sort(sortTrains) : [];

  res.json(result);
});

const fetchTrain = async (trainId) => {
  const response = await axios.get(API_URL + "/" + trainId, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
};

app.post("/trains/:trainId", async (req, res) => {
  const trainId = req.params.trainId;
  let train = await fetchTrain(trainId);

  if (train.message) {
    token = await fetchToken();
    train = await fetchTrain(trainId);
  }

  res.json(train);
});

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(4000, () => {
  console.log("API is running on port 4000");
});
