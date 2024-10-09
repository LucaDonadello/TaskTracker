import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useState, useEffect} from "react";

const REGISTER_URL = "/auth/register";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setErrorMsg("");
  }, [username, password]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Sending the registration request
      await axios.post(REGISTER_URL, {
        username,
        password
      });

      // On successful registration, redirect to login page
      navigate("/login");
    } catch (error) {
      // Handle registration error
      setErrorMsg(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-emerald-400">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
      <p
          className={`${
            errMsg
              ? "errmsg bg-red-500 text-white p-4 rounded-lg shadow-lg animate-slideDown"
              : "offscreen"
          }`}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Register</h1>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
          >
            Register
          </button>
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">
              Already a Member?{" "}
              <Link
                to="/login"
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Login Here
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;