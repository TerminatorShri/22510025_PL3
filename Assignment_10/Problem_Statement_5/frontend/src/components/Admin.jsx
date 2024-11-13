import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import EventCard from "./EventCard";
import { useEventInfo } from "../context/EventInfoContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";

const Admin = () => {
  const { adminEventInfo, setAdminEventInfo } = useEventInfo();
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [isUpdateAction, setIsUpdateAction] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [eventsInitialized, setEventsInitialized] = useState(false);

  const fetchEvents = async () => {
    try {
      console.log(user.id);
      const response = await axios.get(`/api/v1/events/user/${user.id}`);
      console.log(response.data);
      setAdminEventInfo(response.data.data);
      setEventsInitialized(true);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleAdminEvent = (data) => {
    if (isUpdateAction) {
      updateEvent(data);
    } else {
      addNewEvent(data);
    }
    setIsUpdateAction(false);
    setShowForm(false);
    reset();
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("overlay")) {
      setIsUpdateAction(false);
      setShowForm(false);
    }
  };

  const addNewEvent = async (data) => {
    try {
      console.log(data);
      const response = axios.post(
        "/api/v1/events",
        { ...data },
        {
          headers: {
            "Content-Type": "application/json", 
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error adding new event:", error);
      toast.error("Error adding new event. Try again later!");
    }
  };

  const updateEvent = () => {
    // Add API call for updating an event
  };

  const deleteEvent = async (eventId) => {
    try {
      const response = await axios.delete(`/api/v1/events/${eventId}`);
      if (response.status === 204) {
        console.log("Event deleted successfully");
        toast.success("Event deleted successfully");
        fetchEvents();
      } else {
        console.error("Error deleting event:", response.data);
        toast.error("Error deleting event. Try again later!");
      }
    } catch (error) {
      console.error("Error during delete operation:", error);
      toast.error("Something went wrong. Please try again later!");
    }

    console.log("Deleting event with ID:", eventId);
  };

  if (user.role !== "admin") {
    return <p>Access Denied: Admins Only</p>;
  }

  return (
    <div className="relative">
      {/* Event Cards Display */}
      <div className="flex flex-wrap justify-center gap-6">
        {eventsInitialized &&
          adminEventInfo.map((event) => (
            <EventCard
              key={event.id}
              name={event.name}
              description={event.description}
              date={event.date}
              location={event.location}
              photoUrl={event.photoUrl}
              btnType="admin"
              onPrimaryClick={() => {
                setShowForm(true);
                setIsUpdateAction(true);
              }}
              onSecondaryClick={() => deleteEvent(event.id)}
            />
          ))}
      </div>

      {/* Add New Event Button */}
      <button
        title="Add New"
        onClick={() => setShowForm(true)} // Show form when button is clicked
        className="fixed bottom-10 right-10 group cursor-pointer outline-none hover:rotate-90 duration-300 z-20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50px"
          height="50px"
          viewBox="0 0 24 24"
          className="stroke-zinc-400 fill-none group-hover:fill-zinc-800 group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 duration-300"
        >
          <path
            d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
            strokeWidth="1.5"
          ></path>
          <path d="M8 12H16" strokeWidth="1.5"></path>
          <path d="M12 16V8" strokeWidth="1.5"></path>
        </svg>
      </button>

      {/* Add Event Form */}
      {showForm && (
        <div
          className="nunito-font fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30 overlay"
          onClick={handleOverlayClick} // Handle clicks on the overlay
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-80"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold mb-4">
              {isUpdateAction ? "Update Info" : "Add New Event"}
            </h2>
            <form
              onSubmit={handleSubmit(handleAdminEvent)}
              className="space-y-3"
            >
              <input
                type="text"
                placeholder="Event Name"
                {...register("name", { required: true })}
                className="w-full p-2 border rounded"
              />
              <textarea
                placeholder="Description"
                {...register("description", { required: true })}
                className="w-full p-2 border rounded"
              ></textarea>
              <input
                type="date"
                {...register("date", { required: true })}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Location"
                {...register("location", { required: true })}
                className="w-full p-2 border rounded"
              />
              <input
                type="file"
                accept="image/*"
                {...register("photo", { required: true })}
                className="w-full p-2 border rounded"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
                >
                  {isUpdateAction ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
