import userModel from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { findUserByUserName, createUser } = userModel;

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json(new ApiError(400, "All fields are required"));
  }

  try {
    findUserByEmail(email, async (err, user) => {
      if (err)
        return res
          .status(500)
          .json(new ApiError(500, "Failed to check user existence", err));

      if (user.length > 0) {
        return res.status(400).json(new ApiError(400, "User already exists"));
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = { username, email, password: hashedPassword };
      createUser(newUser, (err, result) => {
        if (err) {
          return res
            .status(500)
            .json(new ApiError(500, "Failed to create user", err));
        }

        return res
          .status(201)
          .json(new ApiResponse(201, result, "User registered successfully"));
      });
    });
  } catch (err) {
    return res
      .status(500)
      .json(new ApiError(500, "Internal server error", err));
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

      const token = jwt.sign(
        { id: user[0].id, username: user[0].username },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { id: user[0].id, username: user[0].username, token },
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
