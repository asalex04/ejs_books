import express, {Request, Response} from 'express'
import { v4 as uuid } from 'uuid'
import {IBook} from "../types";
const router = express.Router();


class Books {
    title: string
    author: string
    desc: string
    id: string
    constructor(title = '', author = '', desc = '', id = uuid()) {
        this.title = title
        this.author = author
        this.desc = desc
        this.id = id
    }
}
const store = {
    books: [] as IBook[]
}
const initialArr =  [1, 2, 3]
initialArr.map(el => {
    const newBook = new Books(`book ${el}`, `author ${el}`, `desc book ${el}`)
    store.books.push(newBook)
})

router.get('/', (req: Request, res: Response) => {
    const {books} = store
    res.render('books/index', {
        title: 'Books',
        books: books
    })
});

router.get('/create', (req: Request, res: Response) => {
    res.render('books/create', {
        title: 'Создать книгу',
        books: {}
    })
});

router.post('/create', (req: Request, res: Response) => {
    const {title, author, desc} = req.body
    const {books} = store
    const newBook = new Books(title, author, desc)
    books.push(newBook)
    res.redirect('/books')
});

const notFoundPage = (res: Response, id: number) => {
    if (id === -1) {
        res.redirect('/error')
    }
}

router.get('/:id', (req: Request, res: Response) => {
    const {books} = store
    const curId = books.findIndex(el => el.id === req.params.id)
    notFoundPage(res, curId)
    res.render('books/view', {
        title: 'Books',
        book: books[curId]
    })
});

router.post('/delete/:id', (req: Request, res: Response) => {
    const {books} = store
    const curId = books.findIndex(el => el.id === req.params.id)
    notFoundPage(res, curId)
    books.splice(curId, 1)
    res.redirect('/books')
});

router.get('/update/:id', (req: Request, res: Response) => {
    const {books} = store
    const curId = books.findIndex(el => el.id === req.params.id)
    notFoundPage(res, curId)
    res.render('books/create', {
        title: 'Редактировать книгу',
        books: books[curId]
    })
});

router.post('/update/:id', (req: Request, res: Response) => {
    const {title, author, desc} = req.body
    const {books} = store
    const curId = books.findIndex(el => el.id === req.params.id)
    notFoundPage(res, curId)
    books[curId] = {...books[curId], title, author, desc}
    res.redirect('/books')
});

export default router