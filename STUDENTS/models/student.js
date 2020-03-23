/**
 *
 *
 * @export
 * @class Student
 */
export class Student {
   /**
    *Creates an instance of Student.
    * @param {number} id
    * @param {string} firstName
    * @param {string} lastName
    * @param {string} facultyNumber
    * @param {number} grade
    * @memberof Student
    */
   constructor(id, firstName, lastName, facultyNumber, grade) {
       this.id = id;
       this.firstName = firstName; 
       this.lastName = lastName;
       this.facultyNumber = facultyNumber;
       this.grade = grade;
   }
}