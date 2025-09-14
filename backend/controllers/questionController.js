import { db } from "../db.js";

export const getQuestions = async (req, res) => {
  try {
    const query = `
      SELECT q.*, u.username as author_name, 
             COUNT(a.id) as answer_count
      FROM questions q 
      LEFT JOIN users u ON q.user_id = u.id 
      LEFT JOIN answers a ON q.id = a.question_id 
      GROUP BY q.id 
      ORDER BY q.created_at DESC
    `;

    const [questions] = await db.query(query);
    res.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;

    const questionQuery = `
      SELECT q.*, u.username as author_name 
      FROM questions q 
      JOIN users u ON q.user_id = u.id 
      WHERE q.id = ?
    `;

    const answersQuery = `
      SELECT a.*, u.username as author_name 
      FROM answers a 
      JOIN users u ON a.user_id = u.id 
      WHERE a.question_id = ? 
      ORDER BY a.created_at DESC
    `;

    const [[question]] = await db.query(questionQuery, [id]);
    const [answers] = await db.query(answersQuery, [id]);

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.json({ ...question, answers });
  } catch (error) {
    console.error("Error fetching question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createQuestion = async (req, res) => {
  try {
    const { title, content, category, user_id } = req.body;

    if (!title || !content || !category || !user_id) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const query = `
      INSERT INTO questions (user_id, title, content, category) 
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await db.query(query, [user_id, title, content, category]);
    res.status(201).json({
      message: "Question created successfully",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error creating question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const likeQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "UPDATE questions SET likes = likes + 1 WHERE id = ?";
    await db.query(query, [id]);
    res.json({ message: "Question liked" });
  } catch (error) {
    console.error("Error liking question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const dislikeQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "UPDATE questions SET dislikes = dislikes + 1 WHERE id = ?";
    await db.query(query, [id]);
    res.json({ message: "Question disliked" });
  } catch (error) {
    console.error("Error disliking question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;

    // Verifica se o usuário é o dono da pergunta
    const [question] = await db.query(
      "SELECT user_id FROM questions WHERE id = ?",
      [id]
    );

    if (question.length === 0) {
      return res.status(404).json({ error: "Question not found" });
    }

    if (question[0].user_id !== user_id) {
      return res
        .status(403)
        .json({ error: "You can only delete your own questions" });
    }

    await db.query("DELETE FROM questions WHERE id = ?", [id]);
    res.json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addAnswer = async (req, res) => {
  try {
    const { question_id, user_id, content } = req.body;

    if (!question_id || !user_id || !content) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const query =
      "INSERT INTO answers (question_id, user_id, content) VALUES (?, ?, ?)";
    const [result] = await db.query(query, [question_id, user_id, content]);

    res.status(201).json({
      message: "Answer added successfully",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error adding answer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
