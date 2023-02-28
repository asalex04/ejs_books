import {Router} from "express"
import mainController from "../controllers/mainController";

const {getMain, getError} = mainController

const router = Router()

router.get('/', getMain)
router.get('/error', getError)

export default router