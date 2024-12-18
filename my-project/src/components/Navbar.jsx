import React from 'react'

const Navbar = () => {
  return (
 <nav className=" text-white justify-between bg-slate-700 flex py-3">
    <div className="logo ">
        <span className="font-bold text-xl m-8">iTask</span>
    </div>
    
    <ul className="flex mx-9 gap-9">
        <li className='cursor-pointer hover:font-bold transition-all duration-100'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all duration-100'>Tasks</li>
    </ul>
    
 </nav>
  )
}

export default Navbar
