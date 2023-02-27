import {Request, Response} from 'express'
import {Router} from "express"

const router = Router()

router.get('/', (req: Request, res: Response) => {
    res.render('index', {
        title: 'Главная',
    })
})

router.get('/error', (req: Request, res: Response) => {
    res.render('errors/error', {
        title: 'Главная',
    })
});

export default router