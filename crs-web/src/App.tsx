import "./App.css";
import { BuildingButton } from "./components/BuildingButton";
import { AvaSpaces } from "./components/AvaSpaces";
import { FloorButton } from "./components/FloorButton";
import DBItemDropdown from "./components/DBItemDropdown";

function App() {
  return (
    <div className="App">
      <BuildingButton />
      <AvaSpaces />
      <FloorButton />
      <DBItemDropdown />

      <div className="Background"></div>
    </div>
  );
}

export default App;
