import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useRef, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef()
  const passRef = useRef()
  const [form, setform] = useState({ website: '', username: '', password: '' })
  const [passwordArray, setpasswordArray] = useState([])

  useEffect(() => {
    let passwords = localStorage.getItem('password')
    if (passwords) {
      setpasswordArray(JSON.parse(passwords))
    }
  }, [])

  const copyText = (text) => {

    toast('Copied to clipboard!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text)
  }


  const showPassword = () => {
    if (ref.current.src.includes('icons/hidden.png')) {
      ref.current.src = 'icons/eye.png'
      passRef.current.type = 'text'
    }
    else {
      ref.current.src = 'icons/hidden.png'
      passRef.current.type = 'password'
    }
  };
  const savePassword = () => {
    if (form.website.length > 3 && form.username.length > 3 && form.password.length > 3) {
      console.log(form)
      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
      localStorage.setItem('password', JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
      console.log([...passwordArray, form])
      setform({ website: '', username: '', password: '' })
      toast('Password Saved Succesfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    else {
      toast('Please fill all the fields!', {
        position: "top-right",
        theme: "dark",
      });
    }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const deletePassword = (id) => {
    console.log("Deleting Password", id)
    let confirm = window.confirm("Are you sure you want to delete this password?")
    if (confirm) {
      setpasswordArray(passwordArray.filter((item) => item.id !== id))
      localStorage.setItem('password', JSON.stringify((passwordArray.filter((item) => item.id !== id))))
    }
    toast('Password Deleted', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  }

  const editPassword = (id) => {
    console.log("Editing Password", id)
    setform(passwordArray.filter((item) => item.id === id)[0])
    setpasswordArray(passwordArray.filter((item) => item.id !== id))
  }

  return (
    <>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition="Bounce"
      />


      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className='min-h-auto relative md:mx-40'>
          <div className="container flex flex-col gap-2 justify-between items-center my-25 p-5 mx-auto">
            <div className="logo font-bold text-4xl ">
              <span className='text-green-500'>&lt;</span>
              Pass
              <span className='text-green-500'>OP/&gt;</span>
            </div>
            <p className=' text-green-800 font-medium text-center '>Your own password manager</p>
            <div className='inputs flex flex-col gap-2 w-full'>
              <input value={form.website} onChange={handleChange} name='website' className='p-2 w-full rounded-xl border border-green-700 bg-white' type="text" placeholder='Enter the website URL' />
              <div className='flex w-full gap-2'>
                <input value={form.username} onChange={handleChange} name='username' className='p-2 w-full rounded-xl border border-green-700 bg-white' type="text" placeholder='Enter the username' />
                <div className='relative w-full'>
                  <input ref={passRef} value={form.password} onChange={handleChange} name='password' className='p-2 w-full rounded-xl border border-green-700 bg-white' type="password" placeholder='Enter the password' />
                  <span onClick={showPassword} className='absolute top-[10px] right-[10px]'>
                    <img ref={ref} className='cursor-pointer w-5' src="icons/hidden.png" alt="" />
                  </span>
                </div>
              </div>
              <div className='flex justify-center items-center'>
                <button onClick={savePassword} className='p-2 w-fit flex justify-center items-center px-5 font-medium rounded-xl border  border-green-900 bg-green-500 hover:bg-green-400 transition-all text-white'>
                  Add Password
                  <lord-icon
                    src="https://cdn.lordicon.com/ueoydrft.json"
                    trigger="morph"
                    stroke="light">
                  </lord-icon>
                </button>
              </div>

              <h2 className='font-bold text-xl'>Your Passwords</h2>
              {passwordArray.length === 0 && <p className='text-center text-green-800'>No passwords saved yet</p>}
              {passwordArray.length !== 0 && <table className="table-auto overflow-hidden w-full mb-10 rounded-md md:mx-auto bg-slate-50 ">
                <thead className='hidden md:table-header-group bg-slate-800 opacity-90 blur-l text-white sticky top-0'>
                  <tr>
                    <th className='p-2'>Website</th>
                    <th className='p-2'>Username</th>
                    <th className='p-2'>Password</th>
                    <th className='p-2'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {passwordArray.map((item, index) => {
                    return (
                      <tr
                        key={index}
                        className="flex flex-col md:table-row border-b md:border-0"
                      >
                        <td className="flex justify-between p-2 md:table-cell md:text-center w-35 h-10">
                          <span className="font-semibold md:hidden">Website:</span>
                          <div onClick={() => { copyText(item.website) }} className="flex justify-center items-center gap-2">
                            <a href={item.website} target="_blank">{item.website}</a>
                            <lord-icon className="w-5"
                              src="https://cdn.lordicon.com/fjvfsqea.json"
                              trigger="hover">
                            </lord-icon>
                          </div>
                        </td>

                        <td className="flex justify-between p-2 md:table-cell md:text-center w-35">
                          <span className="font-semibold md:hidden">Username:</span>
                          <div onClick={() => { copyText(item.username) }} className="flex justify-center items-center gap-2">
                            {item.username}
                            <lord-icon className="w-5"
                              src="https://cdn.lordicon.com/fjvfsqea.json"
                              trigger="hover">
                            </lord-icon>
                          </div>
                        </td>

                        <td className="flex justify-between p-2 md:table-cell md:text-center w-35">
                          <span className="font-semibold md:hidden">Password:</span>
                          <div onClick={() => { copyText(item.password) }} className="flex justify-center items-center gap-2">
                            {item.password}
                            <lord-icon className="w-5"
                              src="https://cdn.lordicon.com/fjvfsqea.json"
                              trigger="hover">
                            </lord-icon>
                          </div>
                        </td>

                        <td className="flex justify-between p-2 md:table-cell md:text-center w-35">
                          <span className="font-semibold md:hidden">Actions:</span>
                          <div className="flex gap-2 items-center">
                            <span onClick={() => { editPassword(item.id) }}>
                              <lord-icon className="w-5 cursor-pointer"
                                src="https://cdn.lordicon.com/exymduqj.json"
                                trigger="hover">
                              </lord-icon>
                            </span>
                            <span onClick={() => { deletePassword(item.id) }}>
                              <lord-icon className="w-5 cursor-pointer"
                                src="https://cdn.lordicon.com/hwjcdycb.json"
                                trigger="hover">
                              </lord-icon>
                            </span>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>}


            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default Manager