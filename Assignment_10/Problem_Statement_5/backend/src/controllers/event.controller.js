import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import eventTransaction from "../models/event.model.js";

const {
  createEvent,
  getAllEvents,
  getUserEvents,
  updateEvent,
  deleteEvent,
  getEventsNotRegisteredByUser,
} = eventTransaction;

// Create a new event
const createNewEvent = (req, res) => {
  const { eventData } = req.body;
  const photoUrl = req.file?.path;
  console.log("Add", eventData);

  if (!photoUrl) {
    return res.status(400).json(new ApiError(400, "Photo upload failed"));
  }

  createEvent({ ...eventData, photoUrl }, req.user.id, (err, result) => {
    if (err) {
      console.error("Error creating event:", err);
      return res.status(500).json(new ApiError(500, "Error creating event"));
    }

    res
      .status(201)
      .json(new ApiResponse(201, result, "Event created successfully"));
  });
};

// Fetch all events
const fetchAllEvents = (req, res) => {
  getAllEvents((err, results) => {
    if (err) {
      console.error("Error fetching all events:", err);
      return res.status(500).json(new ApiError(500, "Error fetching events"));
    }

    res
      .status(200)
      .json(new ApiResponse(200, results, "All events retrieved successfully"));
  });
};

// Fetch events created by the logged-in user
const getEventsByUser = (req, res) => {
  const { userId } = req.params;

  getUserEvents(userId, (err, results) => {
    if (err) {
      console.error("Error fetching user events:", err);
      return res
        .status(500)
        .json(new ApiError(500, "Error fetching user events"));
    }

    res
      .status(200)
      .json(
        new ApiResponse(200, results, "User events retrieved successfully")
      );
  });
};

// Update an event by ID
const updateEventById = (req, res) => {
  const eventId = req.params.id;
  const { eventData } = req.body;
  const photoUrl = req.file?.path; // Get the photo URL if a new photo is uploaded

  if (photoUrl) {
    eventData.photoUrl = photoUrl; // Add the photo URL to event data
  }

  updateEvent(eventId, eventData, (err, result) => {
    if (err) {
      console.error("Error updating event:", err);
      return res.status(500).json(new ApiError(500, "Error updating event"));
    }

    res
      .status(200)
      .json(new ApiResponse(200, result, "Event updated successfully"));
  });
};

// Delete an event by ID
const deleteEventById = (req, res) => {
  const { id } = req.params;
  console.log(req.params);

  deleteEvent(id, (err, result) => {
    if (err) {
      console.error("Error deleting event:", err);
      return res.status(500).json(new ApiError(500, "Error deleting event"));
    }

    res
      .status(204)
      .json(new ApiResponse(204, result, "Event deleted successfully"));
  });
};

// Get events not registered by the user
const getEventsNotRegistered = (req, res) => {
  const { userId } = req.body;
  getEventsNotRegisteredByUser(userId, (err, results) => {
    if (err) {
      console.error("Error fetching events not registered by user:", err);
      return res.status(500).json(new ApiError(500, "Error fetching events"));
    }

    res
      .status(200)
      .json(new ApiResponse(200, results, "Events retrieved successfully"));
  });
};

export default {
  createNewEvent,
  fetchAllEvents,
  getEventsByUser,
  updateEventById,
  deleteEventById,
  getEventsNotRegistered,
};
