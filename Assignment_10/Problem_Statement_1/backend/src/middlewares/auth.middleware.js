import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json(new ApiError(401, "Token not provided"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(403).json(new ApiError(403, "Token has expired"));
      }
      return res.status(403).json(new ApiError(403, "Invalid token"));
    }

    req.user = decoded;
    next();
  });
};

export default authenticateToken;
