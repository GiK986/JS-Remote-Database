import { Book } from "../models/book.js";

const BASE_URL = 'https://js-remote-database.firebaseio.com/books'


export class Client {


    /**
     *
     * Create new book
     * @param {Book} book
     * @returns {Promise<{name: string}>}
     * @memberof Client
     */
    async CreateBook(book){
        const url = `${BASE_URL}.json`;

        const options = { method: 'POST', body: JSON.stringify(book) };
        const response = await fetch(url, options);
        const data = await response.json();

        return data;
    }

    /**
     *
     * Update existing book by id.
     * @param {string} bookId
     * @param {Book} book
     * @returns {Promise<Book>}
     * @memberof Client
     */
    async UpdateBook(bookId, book){
        const url = `${BASE_URL}/${bookId}.json`;

        const options = { method: 'PUT', body: JSON.stringify(book) };
        const response = await fetch(url, options);
        const data = await response.json();

        let bookModified = Object.assign(new Book(), data);
           
        return bookModified;
    }

    /**
     *
     *
     * @param {string} bookId
     * @returns {Promise<boolean>}
     * @memberof Client
     */
    async DeleteBook(bookId){
        const url = `${BASE_URL}/${bookId}.json`;

        const options = { method: 'DELETE' };
        const response = await fetch(url, options);
        const data = await response.json();

        return data === null;
    }

    /**
     *
     * Return all collections of books 
     * @returns {Promise<[{id:string, book:Book}]>}
     * @memberof Client
     */
    async GetAllBooks() {
        const url = `${BASE_URL}.json`;
        
        const response = await fetch(url);
        const data = await response.json();

        let dataArr = Object.entries(data);
        let books = dataArr.map(item => {
            
            return {
                id: item[0],
                book: Object.assign(new Book(), item[1])
            }

        });

        return books;
    } 

    /**
     *
     *
     * @param {string} bookId
     * @returns {Promise<Book>}
     * @memberof Client
     */
    async GetBookById(bookId) {
        const url = `${BASE_URL}/${bookId}.json`;
        
        const response = await fetch(url);
        const data = await response.json();

        let book = Object.assign(new Book(), data);
           

        return book;
    } 
}