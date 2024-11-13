import bcrypt from "bcrypt";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import userTransaction from "../models/user.model.js";

const { findUserByUserName, createUser } = userTransaction;

const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    console.log("Registering user:", { username, email, role });

    const hashedPassword = await bcrypt.hash(password, 10);

    createUser(
      { username, email, password: hashedPassword, role },
      (err, result) => {
        if (err) {
          console.error("Error creating user:", err);
          return res.status(500).json(new ApiError(500, "Error creating user"));
        }

        console.log("User registered successfully:", result);
        res
          .status(201)
          .json(new ApiResponse(201, null, "User registered successfully"));
      }
    );
  } catch (error) {
    console.error("Registration failed:", error);
    res
      .status(500)
      .json(new ApiError(500, "Registration Failed", [error.message]));
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json(new ApiError(400, "All fields are required"));
  }

  try {
    findUserByUserName(username, async (err, user) => {
      if (err)
        return res
          .status(500)
          .json(new ApiError(500, "Failed to check user", err));

      if (user.length === 0) {
        return res.status(404).json(new ApiError(404, "User not found"));
      }

      // const validPassword = await bcrypt.compare(password, user[0].password);

      const validPassword = user[0].password === password;

      if (!validPassword) {
        return res.status(401).json(new ApiError(401, "Invalid password"));
      }

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { id: user[0].id, username: user[0].username, role: user[0].role },
            "Login successful"
          )
        );
    });
  } catch (err) {
    return res
      .status(500)
      .json(new ApiError(500, "Internal server error", err));
  }
};

export default { registerUser, loginUser };
