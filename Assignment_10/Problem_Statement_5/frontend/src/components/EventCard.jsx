import React from "react";
import { useAuth } from "../context/AuthContext";

const EventCard = ({
  name,
  description,
  date,
  location,
  photoUrl,
  btnType,
  onPrimaryClick,
  onSecondaryClick,
}) => {
  const { user } = useAuth();
  return (
    <div className="relative flex flex-col h-96 w-80 rounded-xl bg-white shadow-md mb-6">
      {/* Image Section */}
      <div
        className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl shadow-lg"
        style={{
          backgroundImage: `url(${photoUrl})`,
          backgroundSize: "cover", // Ensures the image covers the entire div
          backgroundPosition: "center", // Centers the image in the div
          backgroundRepeat: "no-repeat", // Prevents repeating the image
        }}
      ></div>

      {/* Content Section */}
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          <h5 className="fredoka-font mb-2 block text-xl font-semibold text-blue-gray-900">
            {name}
          </h5>
          <p className="nunito-font block text-base font-light">
            {description}
          </p>
          <p className="nunito-font text-sm text-gray-600">Date: {date.split("T")[0]}</p>
          <p className="nunito-font text-sm text-gray-600">
            Location: {location}
          </p>
        </div>
      </div>

      {/* Button Section */}
      <div className="p-6 pt-0 flex">
        <button
          className={`acme-font select-none rounded-lg py-3 px-6 text-center text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg ${
            btnType === "register"
              ? "bg-blue-500"
              : btnType === "unregister"
              ? "bg-yellow-500"
              : "bg-orange-400"
          }`}
          onClick={onPrimaryClick}
          disabled={user.role === "admin"}
        >
          {btnType === "register"
            ? "Register"
            : btnType === "unregister"
            ? "Unregister"
            : "Update Info"}
        </button>
        {btnType === "admin" && (
          <button
            className={`select-none w-32 rounded-lg py-3 px-6 text-center text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg bg-red-500 ml-4`}
            onClick={onSecondaryClick}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCard;
