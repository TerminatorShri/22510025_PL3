import dbInstance from "../database/mysql.config.js";

const registerUserForEvent = (userId, eventId, callback) => {
  const query = "INSERT INTO registrations (user_id, event_id) VALUES (?, ?)";
  dbInstance.query(query, [userId, eventId], callback);
};

const getUserRegistrations = (userId, callback) => {
  console.log(userId);

  const query = `
    SELECT events.id, events.name, events.description, events.date, events.location, events.photoUrl
    FROM registrations
    JOIN events ON registrations.event_id = events.id
    WHERE registrations.user_id = ?
  `;

  dbInstance.query(query, [userId], callback);
};

export default { registerUserForEvent, getUserRegistrations };
