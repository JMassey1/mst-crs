import { useState } from 'react'
import './App.css'
import {DropdownAction} from "./components/DropdownAction.tsx";
import Background, from "./background.tsx"

function App() {
    const [count, setCount] = useState(0)

    return (
        <div className="App">
            <DropdownAction/>
            <Background />
        </div>
    )
}

export default App
