import { useState } from "react";
import TrainsList from "./components/TrainsList";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="bg-dark text-white min-vh-100 mb-4">
      <h1>Best Trains Company</h1>
      <TrainsList />
    </div>
  );
}

export default App;
