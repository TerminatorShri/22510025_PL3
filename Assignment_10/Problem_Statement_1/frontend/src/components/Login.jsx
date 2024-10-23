import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login } = useAuth();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios
        .post("/api/v1/users/login", {
          username: data.username,
          password: data.password,
        })
        .then((response) => {
          console.log(response.data);
          localStorage.setItem("token", response.data.data.token);
          login({
            id: response.data.data.id,
            username: response.data.data.username,
          });
          navigate("/dashboard");
        })
        .catch((error) => {
          console.log("Error logging in: ", error);
          toast.error("Invalid username or password");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-8 bg-gray-100 rounded-lg shadow-md space-y-6"
      >
        <h2 className="tajawal-font text-2xl font-semibold text-gray-800 text-center mb-4">
          Login
        </h2>

        <div className="relative">
          <label
            htmlFor="username"
            className="fredoka-font block text-gray-700 text-md mb-2"
          >
            Username:
          </label>
          <input
            id="username"
            className="fredoka-font text-sm text-black custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
            type="text"
            placeholder="Enter your username"
            {...register("username", { required: "Username is required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="relative">
          <label
            htmlFor="password"
            className="fredoka-font block text-gray-700 text-md mb-2"
          >
            Password:
          </label>
          <input
            {...register("password", { required: true })}
            placeholder="Password"
            className="fredoka-font text-sm text-black custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
            type="password"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">Password is required</span>
          )}
        </div>
        <div className="flex justify-center mt-6 acme-font">
          <button
            type="submit"
            className="relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group"
          >
            <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4">
              <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
            </span>
            <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4">
              <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
            </span>
            <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0"></span>
            <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
              Submit
            </span>
          </button>
        </div>

        <p className="fredoka-font text-center text-gray-600">
          Don't have an account?
          <span
            onClick={() => navigate("/register")}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            {"  "}Register here
          </span>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
