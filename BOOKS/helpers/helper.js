import { Book } from "../models/book.js";

/**
 * Object whit DOM Element Reference
 */
export const elements = {
    submitBtnRef: document.querySelector('#submit'),
    loadBtnRef: document.querySelector('#loadBooks'),
    tBodyRef: document.querySelector('tbody'),
    formRef: document.querySelector('form'),
}

/**
 *
 *
 * @returns {Book}
 */
export function extractFormData() {
    const form = elements.formRef;
    const book = new Book();
    const keys = Object.keys(book);
    const inputs = form.elements;
    keys.forEach(key => {
        book[key] = inputs.namedItem(key).value;
    });
    return book;
}

/**
 *
 *
 * @export
 * @param {Book} book
 */
export function fillFormData(book) {
    const form = elements.formRef;
    const keys = Object.keys(book);
    const inputs = form.elements;
    keys.forEach(key => {
        inputs.namedItem(key).value = book[key];
    });
}
/**
 *
 *
 * @export
 * @param {Element} tBodyRef
 * @param {string} id
 * @param {Book} book
 */
export function renderTableRow(tBodyRef, id, book) {
    const tr = document.createElement('tr');

    const template = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td>
            <button class="edit" >Edit</button>
            <button class="delete" >Delete</button>
        </td>`;

    tr.setAttribute('data-bookId', id);
    tr.innerHTML = template;
    tBodyRef.appendChild(tr);
}

function removeSpanNotification(form) {
    [...form.querySelectorAll('span')]
        .forEach(e => {
            e.remove();
        });
}

/**
 *
 * Clear form input elements value.
 * @export
 */
export function clearForm() {
    const form = elements.formRef;
    [...form.elements]
        .filter(e => e.tagName === 'INPUT')
        .forEach(e => { 
            e.value = ''
        });
    removeSpanNotification(form);    
}


export function disableSubmitBtn(){
    elements.submitBtnRef.setAttribute("disabled", "disabled");
}

export function enableSubmitBtn() {
    elements.submitBtnRef.removeAttribute("disabled");
}

/**
 *
 *
 * @export
 * @param {Book} book
 */
export function validateBookData(book){
    const form = elements.formRef;
    removeSpanNotification(form);
    let result = true;
    [...form.elements]
        .filter(item => item.tagName === 'INPUT')
        .forEach(input => {
            if (input.value === '') {
                const spanNotification = document.createElement('span');
                spanNotification.className = 'notification';
                spanNotification.textContent = `${input.name} must be filled out`
                
                input.parentNode.insertBefore(spanNotification, input.nextSibling);
                result = false;
            }
        });
  
    return result;
}