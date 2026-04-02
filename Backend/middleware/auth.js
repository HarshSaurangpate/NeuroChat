import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 🔍 Check header exists
  if (!authHeader) {
    return res.status(401).json({ message: "No token" });
  }

  // 🔥 REMOVE "Bearer "
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "secretkey");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};