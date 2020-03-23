/**
 * Object whit DOM Element Reference
 */
export const elements = {
    submitBtnRef: document.querySelector('#submit'),
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
        if (inputs.namedItem(key)) {
            objectData[key] = inputs.namedItem(key).value;
        }
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

async function getTemplateByName(templateName) {
    const response = await fetch(`/STUDENTS/templates/${templateName}.handlebars`);
    const data = response.text();
    return data;
}

export async function renderTableBody(tBodyRef, students) {

    const tableDataTemplate = await getTemplateByName('table-data');

    Handlebars.registerPartial( 'table-data', tableDataTemplate);

    const tableBodyTemplate = await getTemplateByName('table-body');
    const template = Handlebars.compile(tableBodyTemplate);
    const tableBodyHtml = template({students});

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
                addSpanNotificationElement(input);
                result = false;
            }
        });
  
    return result;
}

export function addSpanNotificationElement(inputRef) {
    const spanNotification = document.createElement('span');
    spanNotification.className = 'notification';
    spanNotification.textContent = `${inputRef.name} must be filled out`;
    inputRef.parentNode.insertBefore(spanNotification, inputRef.nextSibling);
}
