import express, {Express} from 'express'
import path from 'path'
import router from './src/routes'
import booksRouter from "./src/routes/books"


const app: Express = express()
const PORT = process.env.PORT || 8000

app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'src', 'views'))

app.use('/', router)
app.use('/books', booksRouter)

app.listen(PORT, () => console.log(`now listening on port ${PORT}`))