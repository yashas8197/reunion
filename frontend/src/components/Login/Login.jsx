import { loginAsync } from "@/utils/authSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const { status, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(loginAsync(userData)).unwrap();
      navigate("/dashboard");
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center px-4">
      <section className="bg-white shadow-2xl w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 p-8">
        <div className="flex justify-center items-center space-x-4 mb-6">
          <img
            src="https://res.cloudinary.com/dlrlwy7hg/image/upload/v1732456754/mini_magick20241124-29114-zzfibi_rhz2je.png"
            alt="logo"
            className="h-8 w-auto"
          />
          <h1 className="text-2xl font-bold">Donezo</h1>
        </div>
        <p className="text-base font-bold text-center my-3">
          Login up to continue
        </p>
        <section>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Enter your email"
                className="border-2 border-gray-400 focus:border-[#569EFC] focus:outline-none p-2 rounded w-full"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Enter your password"
                className="border-2 border-gray-400 focus:border-[#569EFC] focus:outline-none p-2 rounded w-full"
              />
            </div>
            <div>
              <button
                type="submit"
                className="text-white bg-[#569EFC] w-full py-3 rounded-sm font-semibold"
              >
                Login In
              </button>
            </div>
            {error && <p className="text-xs text-red-600">{error}</p>}
          </form>
          <p className="text-center mt-4">
            <Link to="/" className="text-[#569EFC] hover:underline font-medium">
              Create an account? Signup
            </Link>
          </p>
        </section>
      </section>
    </div>
  );
};

export default Login;
