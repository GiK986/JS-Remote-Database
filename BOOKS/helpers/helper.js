import { Book } from "../models/book.js";

/**
 * Object whit DOM Element Reference
 */
export const elements = {
    submitBtnRef: document.querySelector('#submit'),

}

/**
 *
 *
 * @returns {Book}
 */
export function extractFormData() {
    const form = document.querySelector('form');
    const book = new Book();
    const keys = Object.keys(book);
    const inputs = form.elements;
    keys.forEach(key => {
        book[key] = inputs.namedItem(key).value;
    });
    return book;
}