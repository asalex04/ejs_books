import express from 'express'
import booksController from "../controllers/booksController";

const router = express.Router();
const {
    getAll, createForm, create, getOne, deleteOne, updateForm, update
} = booksController

router.get('/', getAll)
router.get('/create', createForm)
router.post('/create', create)
router.get('/:id', getOne)
router.post('/delete/:id', deleteOne)
router.get('/update/:id', updateForm)
router.post('/update/:id', update)
export default router