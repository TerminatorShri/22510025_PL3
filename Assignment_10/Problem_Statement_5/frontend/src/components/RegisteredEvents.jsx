import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "./EventCard";
import { useEventInfo } from "../context/EventInfoContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const RegisteredEvents = () => {
  const { user } = useAuth();
  const { registredEventInfo, setRegistredEventInfo } = useEventInfo();
  const [eventsInitialized, setEventsInitialized] = useState(false);

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        console.log(user.id);
        const response = await axios.get(
          `/api/v1/registration/registered/${user.id}`
        );
        console.log(response.data);
        setRegistredEventInfo(response.data.data);
        setEventsInitialized(true);
      } catch (error) {
        console.error("Error fetching registered events:", error);
        toast.error(
          "Error fetching registered events. Please try again later!"
        );
      }
    };

    if (!eventsInitialized) {
      fetchRegisteredEvents();
    }
  }, [eventsInitialized, setRegistredEventInfo]);

  const unregisterUserFromEvent = (eventId) => {
    // Add API call to unregister user from the event
  };

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {eventsInitialized &&
        registredEventInfo.map((event) => (
          <EventCard
            key={event.id}
            name={event.name}
            description={event.description}
            date={event.date}
            location={event.location}
            photoUrl={event.photoUrl}
            btnType="unregister"
            onPrimaryClick={() => unregisterUserFromEvent(event.id)}
          />
        ))}
    </div>
  );
};

export default RegisteredEvents;
