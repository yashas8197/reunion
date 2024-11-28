import React, { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { logoutAsync } from "@/utils/authSlice";

const Header = () => {
  const { pathname } = useLocation();
  const { status, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log(error, status);

  useEffect(() => {
    if (status === "succeeded") {
      navigate("/login");
    }
  }, [status]);

  const isAuthenticated = localStorage.getItem("isAuthenticated") || "";

  const handleSignout = () => {
    dispatch(logoutAsync());
  };
  return (
    <div className="shadow-md">
      <div className="flex justify-between items-center mx-10 py-4 flex-wrap sm:flex-nowrap">
        <div className="flex items-center space-x-4">
          <img
            src="https://res.cloudinary.com/dlrlwy7hg/image/upload/v1732456754/mini_magick20241124-29114-zzfibi_rhz2je.png"
            alt="logo"
            className="h-8 w-auto sm:h-10"
          />
          <h1 className="text-2xl font-bold text-gray-800">
            <Link to={isAuthenticated ? "/dashboard" : ""}>Donezo</Link>
          </h1>
        </div>

        <nav className="space-x-6 mt-4 sm:mt-0">
          <NavLink
            to="/dashboard"
            className="text-gray-600 hover:text-gray-900 text-lg font-medium"
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/tasks"
            className="text-gray-600 hover:text-gray-900 text-lg font-medium"
          >
            Tasks
          </NavLink>
          {(pathname === "/dashboard" || pathname === "/tasks") && (
            <Button
              className="mt-4 sm:mt-0 bg-[#0055CC]"
              onClick={handleSignout}
            >
              Sign Out
            </Button>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Header;
