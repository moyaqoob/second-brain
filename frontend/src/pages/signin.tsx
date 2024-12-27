import axios from "axios"
import { Button } from "../Components/button";
import { useEffect, useRef } from "react"
export const SignIn = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  
  
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="w-96 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center">Sign In</h2>
          <form className="mt-8 space-y-6" >
            <div className="flex flex-col space-y-1">
              <label htmlFor="text" className="text-sm font-semibold">Username</label>
              <input type="text" name="username" id="user" className="px-3 py-2 border border-gray-300 rounded-md" ref={usernameRef}/>
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="password" className="text-sm font-semibold">Password</label>
              <input type="password" name="password" id="password" ref={passwordRef}  className="px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div className="flex items-center justify-between">
              <Button variant="primary" size="md" title={"SignIn"} className="bg-purple-600 "/>
              <a href="#" className=" cursor-pointer hover:text-purple-500  font-sans hover:transition-opacity" onClick={()=>{
                window.location.href = "/signup"
              }}>Forgot Password?</a>
            </div>
          </form>
        </div>
      </div>
     
    </div>
  )
}
