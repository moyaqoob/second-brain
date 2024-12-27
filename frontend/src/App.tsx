import {SignIn} from "./pages/signin"
import {Dashboard} from "./pages/dashboard"
import { Routes,Route } from 'react-router-dom'
import SignUp from "./pages/signup"
import "./App.css"
// import { Link } from 'react-router-dom'
function App() {
    return(
      <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="signin" element={<SignIn/>} />
          <Route path="signup" element={<SignUp/>} />
      </Routes>
    )
}

export default App
