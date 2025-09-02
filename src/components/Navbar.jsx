import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='flex items-center justify-center my-4 gap-2 text-xl font-medium h-[60px] rounded-lg bg-white  '>
        
            <img src="logos_firebase.svg" alt="svgImage" />
            <h1>Firebase Contact App</h1>
        
    </div>
  )
}

export default Navbar