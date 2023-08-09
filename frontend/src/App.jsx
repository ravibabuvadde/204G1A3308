import { useState } from "react";
import TrainsList from "./components/TrainsList";
import Train from "./components/Train";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [trains, setTrain] = useState([]);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<TrainsList trains={trains} setTrain={setTrain} />}
        />
        <Route path="/train/:trainNumber" element={<Train trains={trains} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
