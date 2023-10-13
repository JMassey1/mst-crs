import React, {useState} from 'react'

const BuildingDropDown = () => {
    const [openProfile, setOpenProfile] = useState(false)
    return(
        <div className='flex flex-col BuildingDropDown'>
            <ul className='flex flex-col gap-4'>
                <li>Comp Sci</li>
                <li>library</li>
                <li>humanities</li>
            </ul>
        </div>
    )
}

export default BuildingDropDown