import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./components/SignUp/SignUp";
import DashBoard from "./components/DashBoard/DashBoard";
import Tasks from "./components/Tasks/Tasks";
import Login from "./components/Login/Login";
import App from "./App";
import { Provider } from "react-redux";
import store from "./utils/store";
import PrivateRoute from "./utils/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: <PrivateRoute element={<DashBoard />} />,
      },
      {
        path: "/tasks",
        element: <PrivateRoute element={<Tasks />} />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
