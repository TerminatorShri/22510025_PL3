import { ApiError } from "../utils/ApiError.js";
import userTransaction from "../models/user.model.js";

const { findUserByEmail } = userTransaction;

const authenticateUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json(new ApiError(400, "Email and password are required"));
  }

  findUserByEmail(email, async (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json(new ApiError(401, "User not found"));
    }

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json(new ApiError(401, "Invalid password"));
    }

    req.user = { id: user.id, username: user.username, role: user.role };
    next();
  });
};

export { authenticateUser };
