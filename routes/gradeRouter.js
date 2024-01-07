import { Router } from 'express';
import gradeController from '../controller/gradeController.js';

const router = Router()

router.get('/', gradeController.get)
router.post('/', gradeController.create)
router.put('/:id', gradeController.update)
router.delete('/:id', gradeController.delete)

export default router