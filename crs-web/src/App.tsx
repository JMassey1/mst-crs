import { useState } from 'react'
import './App.css'
import {BuildingButton} from "./components/BuildingButton.tsx";
import {AvaSpaces} from "./components/AvaSpaces.tsx";
import Background from "./background.tsx"
import { FloorButton } from "./components/FloorButton.tsx";
<<<<<<< Updated upstream
import DBItemDropdown from "./components/DBItemDropdown.tsx"
=======
import Dropdown from "react-bootstrap";
>>>>>>> Stashed changes



function App() {
    const [count, setCount] = useState(0)

    return (
        <div className="App">
            <Background />
            <BuildingButton/>
            <AvaSpaces />
            <FloorButton />
            <DBItemDropdown />

            <div  className="Background"></div>
        </div>
    )
}

export default App
