import { useState } from 'react'
import './App.css'
import api from "./api/api.js";
import {BuildingButton} from "./components/BuildingButton.tsx";
import {AvaSpaces} from "./components/AvaSpaces.tsx";
import Background from "./background.tsx"
import { FloorButton } from "./components/FloorButton.tsx";
import DBItemDropdown from "./components/DBItemDropdown.tsx"



function App() {
    const [count, setCount] = useState(0)

    api.get("");

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
