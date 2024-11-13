import React, { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "./EventCard";
import { useAuth } from "../context/AuthContext";
import { useEventInfo } from "../context/EventInfoContext";
import { toast } from "react-toastify";

const Events = () => {
  const { eventInfo, setEventInfo } = useEventInfo();
  const { user } = useAuth();
  const [eventsInitialized, setEventsInitialized] = useState(false);

  const fetchEvents = async () => {
    try {
      setEventsInitialized(false);
      const response = await axios.get("/api/v1/events/not-registered", {
        params: { userId: user.id },
      });
      setEventInfo(response.data.data);
      setEventsInitialized(true);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Error fetching events. Try again later!");
    }
  };

  useEffect(() => {
    if (user && user.id) {
      fetchEvents();
    }
  }, [user.id, setEventInfo]);

  const registerUserForEvent = async (eventId) => {
    try {
      const response = await axios.post(
        `/api/v1/registration/register/${eventId}/${user.id}`
      );
      console.log(response.data);
      if (response.data.success) {
        toast.success("Successfully registered for the event!");
        fetchEvents();
      }
    } catch (error) {
      console.error("Error registering for event:", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {eventsInitialized &&
        eventInfo &&
        eventInfo.map((event) => (
          <EventCard
            key={event.id}
            name={event.name}
            description={event.description}
            date={event.date}
            location={event.location}
            photoUrl={event.photoUrl}
            btnType="register"
            onPrimaryClick={() => registerUserForEvent(event.id)}
          />
        ))}
    </div>
  );
};

export default Events;
