import { Router } from "express";
import scienceController from "../controller/scienceController.js";

const router = Router()

router.get('/', scienceController.get)
router.post('/', scienceController.create)
router.put('/:id', scienceController.update)
router.delete('/:id', scienceController.delete)

export default router