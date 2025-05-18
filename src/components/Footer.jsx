import React from 'react'

const Footer = () => {
    return (
        <div className='fixed bottom-0 bg-slate-800 w-full text-white flex flex-col justify-center items-center'>
            <div className="logo font-bold text-lg flex ">
                <span className='text-green-500'>&lt;</span>
                Pass
                <span className='text-green-500'>OP/&gt;</span>
            </div>
            <div className='flex justify-center items-center text-sm'>
                Made with
                <lord-icon
                    src="https://cdn.lordicon.com/rqfqhnxq.json"
                    trigger="hover"
                    stroke="light"
                    colors="primary:#121331,secondary:#f28ba8,tertiary:#ffc738,quaternary:#f9c9c0,quinary:#e83a30,senary:#ebe6ef"
                >
                </lord-icon>by Adil Farooq
            </div>
        </div>
    )
}

export default Footer