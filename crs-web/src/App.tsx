import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home.tsx";

import Navbar from "./components/Navbar.tsx";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
