import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Confirmation from "./Components/Confirmation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="confirmation" element={<Confirmation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
