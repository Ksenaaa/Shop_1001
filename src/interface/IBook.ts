export interface IBook {
    idBook: string,
    bookName: string, 
    author: string,
    category: string,
    page: string,
    year: string,
    language: string,
    price: string,
    img: File | null,
    sellerId: string,
}

export interface IBookResponce extends Omit<IBook, 'idBook'> {
    _id: string,
}

export interface IFormBook extends Omit<IBook, 'idBook'> {
}
