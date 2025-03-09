import { useEffect, useRef, useState } from 'react'
import { Button } from '../Components/button'
import { Card } from '../Components/Card'
import { CreateModal } from '../Components/CreateModel'
import { Sidebar } from '../Components/SideBar'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { useContent } from '../hooks/useCreateModel'
// import { Link } from 'react-router-dom'

export function Dashboard(){
  const [modalOpen,setModalOpen] = useState(false);
  const boxref = useRef<HTMLDivElement>(null);
  const {contents,refresh} = useContent();

  useEffect(()=>{
    refresh()
    setTimeout(()=>{
      axios.post(`${BACKEND_URL}/api/v1/ping`)
      .then((res)=>{
        if(res.status===200){
          console.log("backend connected successfully")
          console.log(res.data)
        }else{
          console.log("backend not connected")
        }
      })
      .catch((err)=>{
        console.log("model not connected",err);
      })
    },1000)
  })

  
  return (
    <>
    <Sidebar/>
    <CreateModal open={modalOpen} onClose={()=>{
      setModalOpen(false)
    }} />
    <div className='p-4 ml-72 h-screen bg-gray-100 border-2'>
      <h1 className='text-2xl font-mono'>All Notes</h1>
      <div className='flex justify-between'>
      <div className=' flex gap-2'>
  
      <Button onClick={()=>{
        setModalOpen(true)
        console.log("clicked")
      }} variant='primary' size='md' title={"Add Content"}></Button>
        

      <Button variant='secondary' size='md' title={"Share Content"} ></Button>
      </div>
      </div>
      <div className='flex justify-center gap-x-6 mt-2 items-center flex-wrap' ref={boxref}>
        {contents.map(({link, type, title}) => (
          <Card key={link} link={link} type={type} title={title} />
        ))} 
      </div>
    </div>

    </>
  )
}