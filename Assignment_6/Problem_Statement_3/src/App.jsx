import React from "react";
import { Outlet } from "react-router-dom";
import "./index.css";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <main className="w-full flex-grow p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
