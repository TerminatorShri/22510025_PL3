import { createContext, useContext, useState } from "react";

const EventInfoContext = createContext();

export const useEventInfo = () => useContext(EventInfoContext);

const EventInfoProvider = ({ children }) => {
  const [eventInfo, setEventInfo] = useState([]);
  const [registredEventInfo, setRegistredEventInfo] = useState([]);
  const [adminEventInfo, setAdminEventInfo] = useState([]);

  return (
    <EventInfoContext.Provider
      value={{
        eventInfo,
        setEventInfo,
        registredEventInfo,
        setRegistredEventInfo,
        adminEventInfo,
        setAdminEventInfo,
      }}
    >
      {children}
    </EventInfoContext.Provider>
  );
};

export default EventInfoProvider;
