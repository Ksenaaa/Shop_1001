import { IBookResponce } from "../interface/IBook";

export const normalizeBooks = (books: IBookResponce[]) => books.map((book) => ({
    idBook: book._id,
    ...book
}))