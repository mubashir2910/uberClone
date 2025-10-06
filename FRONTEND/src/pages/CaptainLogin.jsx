import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios';

const CaptainLogin = () => {
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");

  const navigate = useNavigate();
  const {setCaptain} = useContext(CaptainDataContext);


  const handleSubmit =async (e) => {
    e.preventDefault();
    const existingCaptain = {email,password};

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`,existingCaptain);
    if(response.status === 201){
      const data = response.data;
      // console.log(data)
      // console.log(data.captain.fullName.firstName)
      setCaptain(data.captain);
      // console.log(data)
      // console.log(data.captain.fullName.firstName)
   Promise.resolve().then(() => {
        localStorage.setItem('token', data.token);
        navigate('/captains/home');
      });
    }

 
    setEmail("");
    setPassword("");
  }

  return (
    <div className="min-h-screen flex flex-col justify-between p-8">
      
      {/* Top part */}
      <div>
        <img
          className="w-20 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />
        <form onSubmit={(e)=>{handleSubmit(e)}}>
          <h3 className="text-lg font-medium mb-2">What's your email?</h3>
          <input
            required
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            type="email"
            placeholder="email@example.com"
            className="bg-gray-200 rounded-md px-4 py-2 mb-4 border w-full text-lg"
          />

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            type="password"
            placeholder="password"
            className="bg-gray-200 rounded-md px-4 py-2 mb-4 border w-full text-lg"
          />

          <button
            type="submit"
            className="bg-black text-white w-full py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors"
          >
            Login
          </button>
        </form>

        <p className='text-center mt-6'>Join the Fleet ! &nbsp;
          <Link to="/captains/register" className="text-blue-600 underline">Register as a Captain</Link>
        </p>
      </div>

      {/* Bottom part (fixed using flex-grow) */}
      <div>
        <div className="text-center mb-6">
          <Link to='/users/login'
            className="bg-blue-500 text-white block mx-auto w-40 py-2 center rounded-lg font-medium
             hover:bg-yellow-200 transition-colors">
            Sign In as User
          </Link>
        </div>

        <div className="border border-gray-400"></div>
        <footer className="text-gray-500 text-center mt-3">
          Made with <span className="text-red-500">♥</span> || By Mubashir Iqbal
        </footer>
      </div>
    </div>
  )
}

export default CaptainLogin

