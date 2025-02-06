import React, { useState, useEffect } from 'react'
import { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';




const Manager = () => {
  const ref = useRef()
  const passref = useRef()
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passArray, setpassArray] = useState([])
  useEffect(() => {
    let passwords = localStorage.getItem("passwords")
    if (passwords) {
      setpassArray(JSON.parse(passwords))
    }
  }, [])

  const savepassword = () => {
    const updatedpassarray = [...passArray,{...form,id: uuidv4()}]
    setpassArray(updatedpassarray)
      localStorage.setItem("passwords",JSON.stringify(updatedpassarray))
    setform({ site: "", username: "", password: "" })
  }
 /* const handlekeydown=(e)=>{
if(e.key=="Enter"){
  e.preventdefault()
  savepassword()
}   

  }*/
  const showPassword = () => {

    passref.current.type = "text"

    if (ref.current.src.includes("public/eyecross.png")) {
      ref.current.src = "public/passeye.png"
      passref.current.type = "password"
      alert("Hide password")

    }

    else {
      ref.current.src = "public/eyecross.png"
      passref.current.type = "text"
      alert("Show the password");
    }
  }

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const CopyText = (text) => {
    navigator.clipboard.writeText(text)
  }

  const editpass=(id)=>{
    setform(passArray.filter(item=>item.id===id)[0])
    setpassArray(passArray.filter(item=>item.id!==id))
   }

  const deletepass=(id)=>{
    let c=confirm("Do you really want to delete")
    if(c){
      setpassArray(passArray.filter(item=>item.id!=id))
      localStorage.setItem("passwords",JSON.stringify(passArray.filter(item=>item.id!==id)))
    }
   

  }

  return (
    <>
      <div className='container mx-auto  md:mycontainer min-h-screen flex-grow '>

        <h1 className='text-4xl font-bold text-center'>
          <span className='text-green-800'>
            &lt;</span>
          Pass
          <span className='text-green-800'>OP/&gt;</span>
        </h1>

        <p className='text-green-900 text-lg text-center'>Your own password manager</p>

        <div className=" flex flex-col p-4 text-black gap-8 items-center">
          <input className='rounded-full border border-green-700 w-full py-1 px-3' placeholder="Enter website url" type="text" name="site" id="site" value={form.site} onChange={handlechange} />


          <div className="flex justify-between gap-8 w-full">

            <input className='rounded-full border border-green-700 w-full py-1 px-3' placeholder="Enter username" type="text" name="username" id="user" value={form.username} onChange={handlechange} />

            <div className='relative'>
              <input className='  rounded-full border border-green-700 w-full py-1 px-3' ref={passref} placeholder="Enter password" type="password" name="password" id="password" value={form.password} onChange={handlechange} />
              <span className='absolute right-1'>
                <img ref={ref} className="bg-cover py-3 px-1 cursor-pointer" onClick={showPassword} width={20} src="public/passeye.png" alt="eye" /></span>
            </div>


          </div>
          <div>
            <button className=' flex justify-center items-center bg-green-400 rounded-full  px-5 hover:border border-green-950 py-2 w-fit hover:bg-green-300 ' onClick={savepassword}>
              <lord-icon
                src="https://cdn.lordicon.com/jgnvfzqg.json"
                trigger="hover">
              </lord-icon>
              Save password</button>
          </div>
        </div>
        <div className='passwords md:w-full'>
          <h1 className='font-bold font-serif p-1'>Your credentials</h1>
          {passArray.length === 0 && <div className='font-serif font-semiboldS'>No credentials to show</div>}
          {passArray.length != 0 && <table className='bg-green-800 mx-auto mycontainer'>
            <thead>
              <tr>
                <th className='py-1'>Website url</th>
                <th className='py-1'>Username</th>
                <th className='py-1'>Passords</th>
                <th className='py-1'>Actions</th>
              </tr>
            </thead>

            <tbody className='bg-green-100'>
              {passArray.map((item,index ) => {
                return <tr key={index}>
                  <td className='border border-black border-opacity-15 text-center'>
                    <div className="flex gap-2 items-center justify-center">
                      <a href={item.site} target='_blank'>{item.site}</a>
                      <div className='flex size-4 items-center cursor-pointer' onClick={() => CopyText(item.site)}><lord-icon
                        src="https://cdn.lordicon.com/depeqmsz.json"
                        trigger="hover">
                      </lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className='border border-black border-opacity-15 text-center'>
                    <div className="flex gap-2 items-center justify-center">
                      <span>{item.username}</span>
                      <div className='flex size-4 items-center cursor-pointer' onClick={() => CopyText(item.username)}><lord-icon
                        src="https://cdn.lordicon.com/depeqmsz.json"
                        trigger="hover">
                      </lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className='border border-black border-opacity-15 text-center'>
                    <div className="flex gap-2 items-center justify-center">
                      <span>{item.password}</span>
                      <div className='flex size-4 items-center cursor-pointer' onClick={() => CopyText(item.password)}><lord-icon
                        src="https://cdn.lordicon.com/depeqmsz.json"
                        trigger="hover">
                      </lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className='border border-black border-opacity-15 '>
                    <div className="flex  items-center justify-center ">

                      <div className='flex '>
                      <span className=" cursor-pointer mx-1  items-center" onClick={() =>  editpass(item.id) }> <lord-icon
                          src="https://cdn.lordicon.com/wkvacbiw.json"
                          trigger="hover"
                          style={{ width: "20px", height: "20px" }} 
                        ></lord-icon></span>
                      </div>
                      
                      <div className='flex px-2 py-1'>
                      <span className=" cursor-pointer mx-1  items-center" onClick={() =>  deletepass(item.id) }><lord-icon
                          src="https://cdn.lordicon.com/skkahier.json"
                          trigger="hover"
                          style={{ width: "20px", height: "20px" }} 
                        >
                        </lord-icon></span>
                      </div>
                      

                      
                     
                    </div>
                  </td>

                </tr>
              })}
            </tbody>


          </table>
          }
        </div>


      </div>
    </>
  )
}

export default Manager
