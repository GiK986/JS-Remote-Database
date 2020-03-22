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
 * @param {Object} objectData
 * @param {HTMLFormElement} formRef
 * @returns {Object}
 */
export function extractFormData(formRef, objectData) {

    const keys = Object.keys(objectData);
    const inputs = formRef.elements;
    keys.forEach(key => {
        objectData[key] = inputs.namedItem(key).value;
    });
    return objectData;
}

/**
 *
 *
 * @export
 * @param {Object} objectData
 * @param {HTMLFormElement} formRef
 */
export function fillFormData(formRef,objectData) {
    const keys = Object.keys(objectData);
    const inputs = formRef.elements;
    keys.forEach(key => {
        inputs.namedItem(key).value = objectData[key];
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

async function getTemplateByName(templateName) {
    const response = await fetch(`/BOOKS/templates/${templateName}.handlebars`);
    const data = response.text();
    return data;
}

export async function renderTableBody(tBodyRef, books) {

    const tableDataTemplate = await getTemplateByName('table-data');

    Handlebars.registerPartial( 'table-data', tableDataTemplate);

    const tableBodyTemplate = await getTemplateByName('table-body');
    const template = Handlebars.compile(tableBodyTemplate);
    const tableBodyHtml = template({books});

    tBodyRef.innerHTML = tableBodyHtml;
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
 * @param {HTMLFormElement} form
 */
export function clearForm(form) {
   // const form = elements.formRef;
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
 * @param {HTMLFormElement} form
 */
export function validateFormData(form){
    // const form = elements.formRef;
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