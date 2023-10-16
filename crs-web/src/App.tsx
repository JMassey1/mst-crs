import { useState } from 'react'
import './App.css'
import {BuildingButton} from "./components/BuildingButton.tsx";
import {AvaSpaces} from "./components/AvaSpaces.tsx";
import Background, from "./background.tsx"
import FloorButton from "./components/FloorButton.tsx";


function App() {
    const [count, setCount] = useState(0)

    return (
        <div className="App">
            <Background />
            <BuildingButton/>
            <AvaSpaces />
            <FloorButton />

            <div  className="Background"></div>
        </div>
    )
}

export default App
