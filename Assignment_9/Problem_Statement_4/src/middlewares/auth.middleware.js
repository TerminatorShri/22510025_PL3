import { ApiError } from "../utils/ApiError.js";

const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json(
        new ApiError(401, "Unauthorized", ["Authorization Header Missing"])
      );
  }

  const [username, password] = authHeader.split(":");

  const isAuthenticated =
    process.env.ADMIN_NAME === username &&
    process.env.ADMIN_PASSWORD === password;

  if (isAuthenticated) {
    next();
  } else {
    res
      .status(401)
      .json(
        new ApiError(401, "Invalid username or password", [
          "Invalid Credentials",
        ])
      );
  }
};

export default authenticateAdmin;
