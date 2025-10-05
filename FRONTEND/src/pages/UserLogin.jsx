import {useState ,useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';

const UserLogin = () => {
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");

  const navigate = useNavigate();
  const [user,setUser] = useContext(UserDataContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const existingUser = {email:email,password:password};
    console.log(existingUser);
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, existingUser);
    if(response.status === 201){
      const data = response.data;
  
      setUser(data.user);
   
      localStorage.setItem('token', data.token);
      navigate('/home');
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

        <p className='text-center mt-6'>Don't have an account?&nbsp;
          <Link to="/users/register" className="text-blue-600 underline">Sign Up</Link>
        </p>
      </div>

      {/* Bottom part (fixed using flex-grow) */}
      <div>
        <div className="text-center mb-6">
          <Link to='/captains/login'
            className="bg-yellow-500 text-white block mx-auto w-40 py-2 center rounded-lg font-medium
             hover:bg-yellow-200 transition-colors">
            Sign In as Captain
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

export default UserLogin
