import { useEffect, useState } from 'react'
import { Button } from '../Components/button'
import { Card } from '../Components/Card'
import { CreateModel } from '../Components/CreateModel'
import { Sidebar } from '../Components/SideBar'
import DeleteIcon from '../Icons/DeleteIcon'
import StartIcon from "../Icons/StartIcon"
import axios from 'axios'
import { BACKEND_URL } from '../config'
// import { Link } from 'react-router-dom'
export function Dashboard(){
  const [modalOpen,setModalOpen] = useState(false);
  useEffect(()=>{

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
    <CreateModel open={modalOpen} onClose={()=>{
      setModalOpen(false)
    }} />
    <div className='p-4 ml-72 min-h-screen bg-gray-100 border-2'>
      <div className='flex justify-between'>
      <h1>All Notes</h1>
      <div className=' flex gap-2'>
  
      <Button onClick={()=>{
        setModalOpen(true)
        console.log("clicked")
      }} variant='primary' size='md' title={"Add Content"}></Button>
        

      <Button variant='secondary' size='md' title={"Share Content"} ></Button>
      </div>
      </div>
      <div className='flex justify-center gap-x-6 mt-2 items-center flex-wrap'>
        <Card
            title={"Productivity"}
            startIcon={<StartIcon />}
            endIcon={<DeleteIcon />} link={'https://www.youtube.com/embed/E8gmARGvPlI'} type={'youtube'}></Card>
        <Card title={"good tweet"} link={"https://x.com/michael_kove/status/1868649211589476449"} type='twitter'
             startIcon={<StartIcon/>} endIcon={<DeleteIcon/>}/>
      </div>
    </div>

    </>
  )
}