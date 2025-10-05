import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-between p-5 bg-cover bg-[url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]">
      
      {/* Logo at top */}
      <div>
        <img
          className="w-20"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />
      </div>

      {/* Bottom card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mx-auto w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Get Started with Uber</h2>
  
            <Link to="/users/login"  // <-- add the route you want
            className="block w-full bg-black text-white py-3 rounded-lg text-center font-medium hover:bg-gray-900 transition-colors"
            >
            Continue
            </Link>
        </div>
    </div>
  );
};

export default Welcome;
