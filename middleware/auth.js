require("dotenv").config();

const auth = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (apiKey && apiKey === process.env.API_KEY) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized: Invalid or missing API key" });
  }
};

module.exports = auth;
