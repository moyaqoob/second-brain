import { useRef } from "react"
import { Button } from "../Components/button"
import axios from "axios";
import {BACKEND_URL} from "../config"
import { data, useNavigate } from "react-router-dom";

const SignUp = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  async function signup(){
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    console.log(usernameRef.current?.value)
    try{
      if(!username || !password){
        console.log("username and password required");
        return 
      }
      await axios.post(`${BACKEND_URL}/api/v1/signup`,{
        username,
        password
      })
      alert("User Signed up successfully")
      navigate("/signup");
    } catch(e){
      console.log("error occured while signing up",e);

      
    }
  }

  return (
      <div>
        <div className="flex justify-center items-center h-screen">
            <div className="w-96 max-w-100 min-w-70 p-6 bg-white rounded-lg shadow-lg">
                  <h1 className="text-center font-semibold text-2xl" >Sign Up</h1>
                  <form className="mt-8 space-y-6">
                    <div className="flex flex-col space-y-1">
                      <label htmlFor="username" className="font-semibold">Username</label>
                      <input type="text" placeholder="" className="h-10 rounded-lg border border-gray-300 hover:border-red-500" ref={usernameRef}/>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label htmlFor="password" className="font-semibold">Password</label>
                      <input type="text" placeholder="" className="h-10 rounded-lg border border-gray-300 hover:border-red-500" ref={passwordRef} />
                    </div>
                    <div className="flex space-x-2 items-center justify-between ">
                        <Button onClick={signup} variant="primary" size="md" title={"SignUp"} className="bg-purple-600 "/>
                        <p className="font-sm cursor-pointer hover:text-purple-500  font-sans hover:transition-opacity " onClick={()=>{
                          window.location.href = "/signin"
                        }}>Already Logged In?</p>
                    </div>
                  </form>
            </div>
        </div>
      </div>
  )
}

export default SignUp