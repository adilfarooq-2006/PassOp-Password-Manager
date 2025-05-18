import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center bg-slate-800 text-white p-3 px-8 mx-5  md:mx-20 my-3 rounded-full '>
        <div className="logo font-bold text-lg">
          <span className='text-green-500'>&lt;</span>
          Pass
          <span className='text-green-500'>OP/&gt;</span>
          </div>
        <ul >
            <li className="md:flex md:gap-4 hidden">
                <a href="/" className='hover:font-bold transition-all hover:text-green-500'>Home</a>
                <a href="#" className='hover:font-bold transition-all hover:text-green-500'>About</a>
                <a href="#" className='hover:font-bold transition-all hover:text-green-500'>Contact</a>
            </li>
        </ul>
        <a href="https://github.com/adilfarooq-2006?tab=repositories" target='_blank'><button className='flex justify-center items-center gap-2 border  border-green-900 bg-green-500 hover:bg-green-400 transition-all p-1 px-2 rounded-full'>
          <img className='w-6 invert' src="/icons/github.png" alt="" />
          <span className='font-medium'>GitHub</span></button></a>

    </nav>
  )
}

export default Navbar