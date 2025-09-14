import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, username, birthdate, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Email and password are required.",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const q =
    "INSERT INTO users (`name`, `username`, `birthdate`, `email`, `password`) VALUES (?, ?, ?, ?, ?)";
  const values = [name, username, birthdate, email, hashedPassword];

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

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const q = "SELECT * FROM users WHERE email = ?";
  const values = [email];

  try {
    const [rows] = await db.query(q, values);

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const user = rows[0];

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      // Retornar TODOS os dados do usuário (exceto a senha)
      const { password: _, ...userData } = user;

      return res.status(200).json({
        message: "Login successful!",
        token,
        user: userData, // Agora retorna todos os dados do usuário
      });
    } else {
      return res.status(401).json({ error: "Invalid email or password." });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred. Please try again." });
  }
};
