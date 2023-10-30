import { useState } from 'react'
import './App.css'
import {BuildingButton} from "./components/BuildingButton";
import {AvaSpaces} from "./components/AvaSpaces";
import Background from "./background"
import { FloorButton } from "./components/FloorButton";
import DBItemDropdown from "./components/DBItemDropdown"



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
