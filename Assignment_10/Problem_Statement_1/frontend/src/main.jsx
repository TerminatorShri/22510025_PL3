import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import DashboardLayout from "./components/Dashboard.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import AuthProvider from "./context/AuthContext.jsx";
import TaskProvider from "./context/TaskContext.jsx";
import "./index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <TaskProvider>
      <RouterProvider router={router} />
    </TaskProvider>
  </AuthProvider>
);
