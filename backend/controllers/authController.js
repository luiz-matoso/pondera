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
    return res
      .status(500)
      .json({ error: "ERROR: Account wasn't successfully created" });
  }
};
