import { Router } from "express";
import quizController from "../controller/quizController.js";

const router = new Router()

router.get('/', quizController.get)
router.get('/random', quizController.random)
router.post('/create', quizController.create)
router.put('/update', quizController.update)
router.delete('/', quizController.delete)
router.post('/check', quizController.check)

export default router