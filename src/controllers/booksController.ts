import {Request, Response} from 'express'
import { v4 as uuid } from 'uuid'
import {IBook} from "../types";
import {notFoundPage} from "../utils";


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

class booksController {
    getAll (req: Request, res: Response) {
        try {
            const {books} = store
            res.render('books/index', {
                title: 'Books',
                books: books
            })
        } catch (e) {
            console.log(e)
        }
    }

    createForm (req: Request, res: Response) {
        try {
            res.render('books/create', {
                title: 'Создать книгу',
                books: {}
            })
        } catch (e) {
            console.log(e)
        }
    }

    create (req: Request, res: Response) {
        try {
            const {title, author, desc} = req.body
            const {books} = store
            const newBook = new Books(title, author, desc)
            books.push(newBook)
            res.redirect('/books')
        } catch (e) {
            console.log(e)
        }
    }

    getOne (req: Request, res: Response) {
        try {
            const {books} = store
            const curId = books.findIndex(el => el.id === req.params.id)
            notFoundPage(res, curId)
            res.render('books/view', {
                title: 'Books',
                book: books[curId]
            })
        } catch (e) {
            console.log(e)
        }
    }

    deleteOne (req: Request, res: Response) {
        try {
            const {books} = store
            const curId = books.findIndex(el => el.id === req.params.id)
            notFoundPage(res, curId)
            books.splice(curId, 1)
            res.redirect('/books')
        } catch (e) {
            console.log(e)
        }
    }

    updateForm (req: Request, res: Response) {
        try {
            const {books} = store
            const curId = books.findIndex(el => el.id === req.params.id)
            notFoundPage(res, curId)
            res.render('books/create', {
                title: 'Редактировать книгу',
                books: books[curId]
            })
        } catch (e) {
            console.log(e)
        }
    }

    update (req: Request, res: Response) {
        try {
            const {title, author, desc} = req.body
            const {books} = store
            const curId = books.findIndex(el => el.id === req.params.id)
            notFoundPage(res, curId)
            books[curId] = {...books[curId], title, author, desc}
            res.redirect('/books')
        } catch (e) {
            console.log(e)
        }
    }
}

export default new booksController()
