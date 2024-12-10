import './App.css'
import { Button } from './Components/button'

function App() {

  
  return (
    <>
      <nav className='flex justify-between text-purple-600'>
      <h1>All notes</h1>
      <Button variant='secondary' size='md' title={"Share Content"} color={'purple'}></Button>
      </nav>
    </>
  )
}

export default App
