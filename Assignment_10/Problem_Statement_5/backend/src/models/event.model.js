import dbInstance from "../database/mysql.config.js";

const createEvent = (
  { name, description, date, location, photoUrl },
  userId,
  callback
) => {
  const query =
    "INSERT INTO events (name, description, date, location, photoUrl, userId) VALUES (?, ?, ?, ?, ?, ?)";
  dbInstance.query(
    query,
    [name, description, date, location, photoUrl, userId],
    callback
  );
};

const getAllEvents = (callback) => {
  dbInstance.query("SELECT * FROM events", callback);
};

const getUserEvents = (userId, callback) => {
  const query = "SELECT * FROM events WHERE userId = ?";
  dbInstance.query(query, [userId], callback);
};

const updateEvent = (eventId, eventData, callback) => {
  const { name, description, date, location, photoUrl } = eventData;
  dbInstance.query(
    "UPDATE events SET name = ?, date = ?, location = ?, description = ?, photoUrl = ? WHERE id = ?",
    [name, date, location, description, photoUrl, eventId],
    callback
  );
};

const deleteEvent = (id, callback) => {
  console.log("In model", id);
  dbInstance.query("DELETE FROM events WHERE id = ?", [id], callback);
};

const getEventsNotRegisteredByUser = (userId, callback) => {
  const query = `
    SELECT * FROM events 
    WHERE id NOT IN (
      SELECT event_id FROM registrations WHERE user_id = ?
    )
  `;
  dbInstance.query(query, [userId], callback);
};

export default {
  createEvent,
  getAllEvents,
  getUserEvents,
  updateEvent,
  deleteEvent,
  getEventsNotRegisteredByUser,
};
