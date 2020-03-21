import { elements, extractFormData, renderTableRow, clearForm, fillFormData, disableSubmitBtn, enableSubmitBtn, validateBookData } from "./helpers/helper.js";
import { Client } from "./helpers/firebase-client.js";

let selectedBookId = '';
const client = new Client();



async function createBook(event) {
    event.preventDefault();
    const book = extractFormData();
    if (!validateBookData(book)) {
        return;
    }
    const result = await client.CreateBook(book);
    console.log(result);

    refreshData();
}

async function loadBooks() {

    const tBodyRef = elements.tBodyRef;
    tBodyRef.innerHTML = '';

    let books = await client.GetAllBooks();
    books.forEach( ({ id, book }) => {
        renderTableRow(tBodyRef, id, book);
    });

    clearForm();
    enableSubmitBtn();
}

async function loadBook(bookId) {
    
    const book = await client.GetBookById(bookId);
    fillFormData(book);

    disableSubmitBtn();
    selectedBookId = bookId;
    console.log(selectedBookId);
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
        const isEditBtn = currentTarget.className === 'edit';
        let result = undefined;
        if (isEditBtn) {
            const book = extractFormData();
            result = await client.UpdateBook(selectedBookId, book);
            console.log(result);
        }
        else {
           result = await client.DeleteBook(bookId);
           console.log(result);
        }
        selectedBookId = undefined;
        refreshData();
    }
}

function refreshData() {
        clearForm();
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
