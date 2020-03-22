import  {elements, extractFormData, renderTableBody, clearForm, fillFormData, disableSubmitBtn, enableSubmitBtn, validateFormData } from "./helpers/helper.js";
import { Client } from "./helpers/firebase-client.js";
import { Book } from "./models/book.js";

let selectedBookId = '';
const apiId = 'https://js-remote-database.firebaseio.com';
const collection = 'books';
const client = new Client(apiId, collection);


/**
 *
 *
 * @param {MouseEvent} event
 * @returns
 */
async function createBook(event) {
    event.preventDefault();
    const form = event.target.parentNode;
  
    if (!validateFormData(form)) {
        return;
    }

    const book = extractFormData(form, new Book());
    const result = await client.Create(book);
    console.log(result);

    refreshData();
}

async function loadBooks() {
    let books = await client.GetAllEntries();

    const tBodyRef = elements.tBodyRef;

    await renderTableBody(tBodyRef, books);

    clearForm(elements.formRef);
    enableSubmitBtn();
}

async function loadBook(bookId) {
    
    const book = await client.GetEntryById(bookId);
    const form = elements.formRef;
    fillFormData(form, book);

    disableSubmitBtn();
    selectedBookId = bookId;
}

async function editHandleEvent(event) {
    const currentTarget = event.target; 
    const currentTRowRef = currentTarget.closest('tr'); 
    const bookId = currentTRowRef.dataset.bookid;

    const isTRow = currentTarget.tagName === 'TD';
    const isButton = currentTarget.tagName === 'BUTTON' ;
      
    if (isTRow) {
        loadBook(bookId);

        if(selectedBookId && selectedBookId !== bookId){
            elements.tBodyRef
            .querySelector('.selectedRow')
            .className = ''
        }

        currentTRowRef.className = 'selectedRow';
    }

    if (isButton && selectedBookId === bookId) {
        const isEditBtn = currentTarget.dataset['method'] === 'edit';
        let result = undefined;
        if (isEditBtn) {

            const book = extractFormData(elements.formRef, new Book());
            result = await client.Update(selectedBookId, book);
            console.log(result);
        }
        else {
           result = await client.Delete(bookId);
           console.log(result);
        }
        selectedBookId = undefined;
        refreshData();
    }
}

function refreshData() {
        clearForm(elements.formRef);
        loadBooks();
}

function validateInput(event) {
    let nextSibling = event.target.nextSibling;

    if (event.target.value !== '') {
        let isSpan = nextSibling.tagName === 'SPAN';

        if (isSpan) {
            nextSibling.remove();
        }

    }
}


function eventHandler() {
    try {
        elements.submitBtnRef.addEventListener('click', createBook);
        elements.loadBtnRef.addEventListener('click', loadBooks);
        elements.tBodyRef.addEventListener('click', editHandleEvent);
        elements.formRef.addEventListener('focusout', validateInput);
    } catch (error) {
        console.error(error);
    }

    loadBooks();
}

eventHandler();
