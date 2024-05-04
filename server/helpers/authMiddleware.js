const jwt = require("jsonwebtoken");
const User = require("../models/auth.model");

const authMiddleware = async (req, res, next) => {
  try {
    // Verify authorization
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: "Authorization token required" });
    }

    // Split the autorization header
    const token = authorization.split(" ")[1];

    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid authorization token" });
  }
};

module.exports = authMiddleware;
