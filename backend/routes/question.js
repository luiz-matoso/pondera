import express from "express";
import {
  getQuestions,
  getQuestionById,
  createQuestion,
  likeQuestion,
  dislikeQuestion,
  deleteQuestion,
  addAnswer,
} from "../controllers/questionController.js";

const router = express.Router();

router.get("/", getQuestions);
router.get("/:id", getQuestionById);
router.post("/", createQuestion);
router.post("/:id/like", likeQuestion);
router.post("/:id/dislike", dislikeQuestion);
router.delete("/:id", deleteQuestion);
router.post("/:id/answers", addAnswer);

export default router;
