import React from 'react'

const Navbar = () => {
    return (
        <nav className=' bg-slate-800  text-white'>
            <div className='   h-14 items-center px-4 py-5 flex  justify-between mx-10'>
                <div className='logo  font-bold text-2xl ' >
                    <span className='text-green-800'>
                        &lt;</span> Pass
                    <span className='text-green-800'>OP/&gt;</span>
                </div>
                <div className="btn flex gap-1 bg-green-400 cursor-pointer rounded-full px-1  justify-between  hover:bg-green-300 hover:border-2  ring-1 ring-white">
                    <img className='invert  rounded-full' width={20} src="public/githubLogo.jpg" alt="" />
                    <button className=''>GitHub</button>
                </div>
            </div>



        </nav>
    )
}

export default Navbar
