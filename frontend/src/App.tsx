import './App.css'
import { Button } from './Components/button'
import { Card } from './Components/Card'
import { Sidebar } from './Components/SideBar'
import DeleteIcon from './Icons/DeleteIcon'
import StartIcon from './Icons/StartIcon'
function App() {


  return (
    <>
    <div className='flex'>
      
    <Sidebar/>
    <div className='w-screen h-screen justify-center flex-start'>
      <Button variant='secondary' size='md' title={"Share Content"} color={'purple'}></Button>
      <div className='flex justify-center gap-x-6 '>
        <Card
            title={"Productivity"}
            startIcon={<StartIcon />}
            endIcon={<DeleteIcon />} link={'https://www.youtube.com/embed/E8gmARGvPlI'} type={'youtube'} ></Card>
        <Card title={"good tweet"} link={"https://twitter.com/michael_kove/status/1868649211589476449"} type='twitter' startIcon={<StartIcon/>} endIcon={<DeleteIcon/>}/>
         <blockquote>
          <a href="https://twitter.com/michael_kove/status/1868649211589476449"></a>
         </blockquote>
      </div>
    </div>
    </div>

    </>
  )
}

export default App
