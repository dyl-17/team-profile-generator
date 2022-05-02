const Employee = require("./Employee");

class Engineer extends Employee {
  constructor(name, id, email, github) {
    // TODO: YOUR CODE HERE
    super(name, id, email);
    this.github = github;
  }

  getRole() {
    // TODO: YOUR CODE HERE
    return 'Engineer';
  }

  getGithub() {
    // TODO: YOUR CODE HERE
    return this.github
  }

}

module.exports = Engineer;
