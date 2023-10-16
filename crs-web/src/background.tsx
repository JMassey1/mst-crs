import { useState } from 'react'
import './App.css'
declare module '*.png'
import Logo from '/mstlogo.png'

function background() {
    const [count, setCount] = useState(0)
    return (
        <>
            <div className="card">
            </div>
            <div style={{width: '100%', height: '100%', position: 'relative', background: '#EAEAEA'}}>
                <div style={{
                    width: 1540,
                    height: 85,
                    left: -700,
                    top: -330,
                    position: 'absolute',
                    background: '#003B49'
                }}/>
                <div style={{
                    width: 129,
                    height: 130,
                    left: -580,
                    top: -328,
                    position: 'absolute',
                    background: '#72BF44',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
                }}/>
                <img style={{width: 106, height: 89, left: -567, top: -310, position: 'absolute'}} src={Logo}
                     alt={"Description"}/>
                <div style={{
                    width: 415,
                    height: 31,
                    left: -470,
                    top: -295,
                    position: 'absolute',
                    color: 'white',
                    fontSize: 22,
                    fontFamily: 'Inter',
                    fontWeight: '400',
                    wordWrap: 'break-word'
                }}>CAMPUS RESERVATION SYSTEM<br/></div>
            </div>
        </>
    );
}

export default background