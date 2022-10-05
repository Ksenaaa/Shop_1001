import { IBookResponce } from "../interface/IBook";

export const normalizeBooks = (books: IBookResponce[]) => books.map((book) => ({
    idBook: book._id,
    bookName: book.bookName, 
    author: book.author,
    category: book.category,
    page: book.page,
    year: book.year,
    language: book.language,
    price: book.price,
    img: book.img,
    sellerId: book.sellerId,
}))

export const normalizeBook = (book: IBookResponce) => ({
    idBook: book._id,
    bookName: book.bookName, 
    author: book.author,
    category: book.category,
    page: book.page,
    year: book.year,
    language: book.language,
    price: book.price,
    img: book.img,
    sellerId: book.sellerId,
})
