import {Request, Response} from 'express'
import {Router} from "express"

class mainController {
    getMain (req: Request, res: Response) {
        try {
            res.render('index', {
                title: 'Главная',
            })
        } catch (e) {
            console.log(e)
        }
    }

    getError (req: Request, res: Response) {
        try {
            res.render('errors/error', {
                title: 'Главная',
            })
        } catch (e) {
            console.log(e)
        }
    }
}

export default new mainController()


// router.get('/', (req: Request, res: Response) => {
//     res.render('index', {
//         title: 'Главная',
//     })
// })
//
// router.get('/error', (req: Request, res: Response) => {
//     res.render('errors/error', {
//         title: 'Главная',
//     })
// });

