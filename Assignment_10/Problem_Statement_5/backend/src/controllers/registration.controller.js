import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import registrationTransaction from "../models/registration.model.js";

// Register a user for an event
const registerForEvent = (req, res) => {
  const { eventId, userId } = req.params;

  registrationTransaction.registerUserForEvent(
    userId,
    eventId,
    (err, result) => {
      if (err) {
        console.error("Error registering for event:", err);
        return res
          .status(500)
          .json(new ApiError(500, "Error registering for event"));
      }

      res
        .status(201)
        .json(
          new ApiResponse(201, result, "Successfully registered for the event")
        );
    }
  );
};

// Fetch all registrations for the logged-in user
const getUserRegistrations = (req, res) => {
  const { userId } = req.params;

  registrationTransaction.getUserRegistrations(userId, (err, results) => {
    if (err) {
      console.error("Error fetching user registrations:", err);
      return res
        .status(500)
        .json(new ApiError(500, "Error fetching registrations"));
    }

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          results,
          "User registrations retrieved successfully"
        )
      );
  });
};

export default { registerForEvent, getUserRegistrations };
