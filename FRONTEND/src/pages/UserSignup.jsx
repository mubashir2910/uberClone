import {useState,useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';

const UserSignup = () => {
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState(""); 

  const navigate = useNavigate();
  const [user, setUser] = useContext(UserDataContext);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const newUser = {fullName:{firstName:firstName,lastName:lastName},email:email,password:password};
    
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);
    if(response.status === 201){
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token', data.token);
      navigate('/home');
    }
    
    setFirstName("");
    setLastName(""); 
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
          <h3 className="text-lg font-medium mb-2">What's your name?</h3>
          <div className='flex gap-4 mb-4'>
            <input
            required
            value={firstName}
            onChange={(e)=>{setFirstName(e.target.value)}}
            type='text'
            placeholder="First Name"
            className="bg-gray-200 w-3/5 rounded-md px-4 py-2 border text-lg"
          />

          <input
            value={lastName}
            onChange={(e)=>{setLastName(e.target.value)}}
            type='text'
            placeholder="Last Name"
            className="bg-gray-200 w-2/5 rounded-md px-4 py-2 border text-lg"
          />
          </div>
          
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
            Register
          </button>
        </form>

        <p className='text-center mt-6'>Already have an account?&nbsp;
          <Link to="/users/login" className="text-blue-600 underline">Login</Link>
        </p>
      </div>

      {/* Bottom part (fixed using flex-grow) */}
      <div>
        <div className="border border-gray-400"></div>
        <footer className="text-gray-500 text-center mt-3">
          Made with <span className="text-red-500">♥</span> || By Mubashir Iqbal
        </footer>
      </div>
    </div>
  )
}

export default UserSignup
