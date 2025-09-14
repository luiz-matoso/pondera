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
    const { user_id } = req.query;

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

    const userVoteQuery = `
      SELECT vote_type FROM question_votes 
      WHERE question_id = ? AND user_id = ?
    `;

    const [[question]] = await db.query(questionQuery, [id]);
    const [answers] = await db.query(answersQuery, [id]);

    let userVote = null;
    if (user_id) {
      const [voteResult] = await db.query(userVoteQuery, [id, user_id]);
      userVote = voteResult.length > 0 ? voteResult[0].vote_type : null;
    }

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.json({
      ...question,
      answers,
      userVote,
    });
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
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(401).json({ error: "User ID is required" });
    }

    const [existingVote] = await db.query(
      "SELECT * FROM question_votes WHERE question_id = ? AND user_id = ?",
      [id, user_id]
    );

    if (existingVote.length > 0) {
      const vote = existingVote[0];

      if (vote.vote_type === "like") {
        await db.query("DELETE FROM question_votes WHERE id = ?", [vote.id]);
        await db.query("UPDATE questions SET likes = likes - 1 WHERE id = ?", [
          id,
        ]);
        return res.json({ message: "Like removed", action: "removed" });
      } else {
        await db.query(
          "UPDATE question_votes SET vote_type = 'like' WHERE id = ?",
          [vote.id]
        );
        await db.query(
          "UPDATE questions SET likes = likes + 1, dislikes = dislikes - 1 WHERE id = ?",
          [id]
        );
        return res.json({ message: "Changed to like", action: "changed" });
      }
    } else {
      await db.query(
        "INSERT INTO question_votes (question_id, user_id, vote_type) VALUES (?, ?, 'like')",
        [id, user_id]
      );
      await db.query("UPDATE questions SET likes = likes + 1 WHERE id = ?", [
        id,
      ]);
      return res.json({ message: "Question liked", action: "added" });
    }
  } catch (error) {
    console.error("Error liking question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const dislikeQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(401).json({ error: "User ID is required" });
    }

    const [existingVote] = await db.query(
      "SELECT * FROM question_votes WHERE question_id = ? AND user_id = ?",
      [id, user_id]
    );

    if (existingVote.length > 0) {
      const vote = existingVote[0];

      if (vote.vote_type === "dislike") {
        await db.query("DELETE FROM question_votes WHERE id = ?", [vote.id]);
        await db.query(
          "UPDATE questions SET dislikes = dislikes - 1 WHERE id = ?",
          [id]
        );
        return res.json({ message: "Dislike removed", action: "removed" });
      } else {
        await db.query(
          "UPDATE question_votes SET vote_type = 'dislike' WHERE id = ?",
          [vote.id]
        );
        await db.query(
          "UPDATE questions SET dislikes = dislikes + 1, likes = likes - 1 WHERE id = ?",
          [id]
        );
        return res.json({ message: "Changed to dislike", action: "changed" });
      }
    } else {
      await db.query(
        "INSERT INTO question_votes (question_id, user_id, vote_type) VALUES (?, ?, 'dislike')",
        [id, user_id]
      );
      await db.query(
        "UPDATE questions SET dislikes = dislikes + 1 WHERE id = ?",
        [id]
      );
      return res.json({ message: "Question disliked", action: "added" });
    }
  } catch (error) {
    console.error("Error disliking question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;

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

export const getCategories = async (req, res) => {
  try {
    const query = "SELECT * FROM categories ORDER BY name";
    const [categories] = await db.query(query);
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
