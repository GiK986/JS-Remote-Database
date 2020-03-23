import { Client } from "./helpers/firebase-client.js";
import { Student } from "./models/student.js";
import { elements, renderTableBody, extractFormData, validateFormData, clearForm, addSpanNotificationElement } from "./helpers/helper.js";

const apiId = 'https://js-remote-database.firebaseio.com';
const collection = 'students';
const client = new Client(apiId, collection);

async function startUp() {

    await loadTable();

    elements.formRef.addEventListener('submit', createStudent);
    elements.formRef.addEventListener('focusout', validateInput);
    
    const nextId = await getNextId();
    console.log(nextId);
}

startUp();

async function loadTable() {
    const result = await client.GetAllEntries();
    const students = result.map(x => x.entry).sort((a, b) => a.id - b.id);
    renderTableBody(elements.tBodyRef, students);
    
}

async function getNextId() {
    const result = await client.GetAllEntries();

    if (!result) {
        return 1;
    }

    const studentsId = result.map(x => x.entry.id);
    const nextId = Math.max(...studentsId) + 1;
    return nextId;
}

function validateInput(event) {
    let nextSibling = event.target.nextSibling;
    
    if (event.target.tagName === 'INPUT') {
        let isSpan = nextSibling.tagName === 'SPAN';
        if (isSpan) {
            nextSibling.remove();
        }

        if (event.target.value === '') {
            addSpanNotificationElement(event.target);
        
        }
    }
}

/**
 *
 *
 * @param {MouseEvent} event
 */
async function createStudent(event) {
    event.preventDefault();
    const form = event.target;
    if (!validateFormData(form)) {
        return;
    };
    const student = extractFormData(event.target, new Student());
    student.id = await getNextId();

    const result = await client.Create(student);
   
    clearForm(form);
    await loadTable();
    console.log(result);
}