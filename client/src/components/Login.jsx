import { Link, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";

const LOGIN_URL = "/auth/login";

function Login() {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  // Focus on the user input field when the page loads
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // Clear error message when user or password changes
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loginData = { username: user, password: pwd };
      console.log("Sending login data:", loginData);
  
      const res = await axios.post(LOGIN_URL, JSON.stringify(loginData), {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
  
      const accessToken = res?.data?.token;
      const roles = res?.data?.roles || [];
  
      setAuth({ user, roles, accessToken });
      console.log("Setting auth with:", { user, roles, accessToken });
      console.log("Response from server:", res.data);
      setUser("");
      setPwd("");

      // Navigate to the tracker after a short delay for debugging
      setTimeout(() => navigate("/tracker"), 100);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Server error. Please try again later.");
      } else if (err.response.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response.status === 401) {
        setErrMsg("Invalid Username or Password");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-emerald-400">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
        <p
          ref={errRef}
          className={`${
            errMsg
              ? "errmsg bg-red-500 text-white p-4 rounded-lg shadow-lg animate-slideDown"
              : "offscreen"
          }`}
          aria-live="assertive"
        >
          {errMsg}
        </p>

        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Login
        </h1>
        <form onSubmit={handleLogin}>
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
              ref={userRef}
              placeholder="Enter your username"
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
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
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
          >
            Login
          </button>
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">
              New here?{" "}
              <Link
                to="/register"
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Create an Account
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;