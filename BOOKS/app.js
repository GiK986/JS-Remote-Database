import { elements, extractFormData } from "./helpers/helper.js";


function createBook(event) {
    event.preventDefault();
    const book = extractFormData();
    console.log(book);

}

function eventHandler() {

    elements.submitBtnRef.addEventListener('click', createBook);

}

eventHandler();



