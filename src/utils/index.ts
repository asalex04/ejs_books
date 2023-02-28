import {Response} from "express";

export const notFoundPage = (res: Response, id: number) => {
    if (id === -1) {
        res.redirect('/error')
    }
}