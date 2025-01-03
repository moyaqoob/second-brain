import axios from "axios";
import { Button } from "../Components/button";
import { useRef } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const SignIn: React.FC = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function  verifyUser(e: React.MouseEvent<HTMLButtonElement>)  {
    e.preventDefault(); // Prevent default form behavior

    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      alert("Username and password are required");
      return;
    }

    try {
      await axios.post(`${BACKEND_URL}/api/v1/signin`, { username, password });
      console.log("User signed in successfully");
      navigate("/");
    } catch (error: any) {
      console.error("Error signing in:", error.response?.data || error.message);
      alert("Failed to sign in. Please check your credentials.");
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="w-96 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center">Sign In</h2>
          <form className="mt-8 space-y-6">
            {/* Username Field */}
            <div className="flex flex-col space-y-1">
              <label htmlFor="username" className="text-sm font-semibold">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="px-3 py-2 border border-gray-300 rounded-md"
                ref={usernameRef}
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col space-y-1">
              <label htmlFor="password" className="text-sm font-semibold">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="px-3 py-2 border border-gray-300 rounded-md"
                ref={passwordRef}
              />
            </div>

            {/* Sign In Button */}
            <div className="flex items-center justify-between">
              <Button
                variant="primary"
                size="md"
                title="Sign In"
                className="bg-purple-600"
                onClick={()=>verifyUser}
              />

              {/* Forgot Password */}
              <a
                href="#"
                className="cursor-pointer hover:text-purple-500 font-sans hover:transition-opacity"
                onClick={() => navigate("/signup")}
              >
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

