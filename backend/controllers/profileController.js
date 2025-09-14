import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const updateProfile = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token de autenticação não fornecido.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { name, email } = req.body;

    const q = "UPDATE users SET name = ?, email = ? WHERE id = ?";
    const values = [name, email, userId];

    await db.query(q, values);

    const [updatedUser] = await db.query(
      "SELECT id, name, username, email FROM users WHERE id = ?",
      [userId]
    );

    return res.json({ success: true, user: updatedUser[0] });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ success: false, message: "Token inválido." });
    }
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Erro ao atualizar perfil." });
  }
};

export const changePassword = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token de autenticação não fornecido.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { currentPassword, newPassword } = req.body;

    const [user] = await db.query("SELECT password FROM users WHERE id = ?", [
      userId,
    ]);
    if (
      user.length === 0 ||
      !(await bcrypt.compare(currentPassword, user[0].password))
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Senha atual incorreta." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await db.query("UPDATE users SET password = ? WHERE id = ?", [
      hashedPassword,
      userId,
    ]);

    return res.json({ success: true, message: "Senha alterada com sucesso." });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ success: false, message: "Token inválido." });
    }
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Erro ao alterar senha." });
  }
};
