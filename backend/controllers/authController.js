import { db } from "../db.js";

export const register = async (req, res) => {
  const { name, username, birthdate, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Email and password are required.",
    });
  }

  const q =
    "INSERT INTO users (`name`, `username`, `birthdate`, `email`, `password`) VALUES (?, ?, ?, ?, ?)";
  const values = [name, username, birthdate, email, password];

  try {
    await db.query(q, values);
    return res.status(201).json({
      message: "Account successfully created!",
    });
  } catch (error) {
    console.error(error);
    if (error.errno === 1062) {
      if (error.sqlMessage.includes("email")) {
        return res
          .status(409)
          .json({ error: "This email is already registered." });
      } else if (error.sqlMessage.includes("username")) {
        return res
          .status(409)
          .json({ error: "This username is already taken." });
      }
      return res
        .status(409)
        .json({ error: "This email or username is already in use." });
    }
    return res
      .status(500)
      .json({ error: "An error occurred. Please try again." });
  }
};
