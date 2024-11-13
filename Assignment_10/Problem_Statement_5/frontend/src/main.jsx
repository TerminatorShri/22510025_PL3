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
import DashboardLayout from "./components/DashboardLayout.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Events from "./components/Events.jsx";
import RegisteredEvents from "./components/RegisteredEvents.jsx";
import Admin from "./components/Admin.jsx";
import AuthProvider from "./context/AuthContext.jsx";
import EventInfoProvider from "./context/EventInfoContext.jsx";
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
      >
        <Route path="events" element={<Events />} />
        <Route path="registered" element={<RegisteredEvents />} />
        <Route path="admin" element={<Admin />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <EventInfoProvider>
      <RouterProvider router={router} />
    </EventInfoProvider>
  </AuthProvider>
);
