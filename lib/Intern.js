const Employee = require("./Employee");

class Intern extends Employee {
  constructor(name, id, email, school) {
    // TODO: YOUR CODE HERE
    super(name, id, email);
    this.school = school
  }

  getRole() {
    // TODO: YOUR CODE HERE
    return 'Intern';
  }

  getSchool() {
    // TODO: YOUR CODE HERE
    return this.school;
  }

}

module.exports = Intern;
