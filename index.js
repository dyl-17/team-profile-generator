const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const DIST_DIR = path.resolve(__dirname, 'dist');
const distPath = path.join(DIST_DIR, 'team.html');

const render = require('./src/page-template.js');

const teamMembers = [];
// Create an id array to store the ids.
// This array will be used to check the potential duplicate id newly entered by user
const idArray = [];

// Inform user of usage
console.log(
  '\nWelcome to the team generator!\nUse `npm run reset` to reset the dist/ folder\n'
);

function appMenu() {
  // Create manager first, then the manager will create a team
  // Once manager is craeted, we will create team by asking the user which type of employee to create
  // Based on the choice, we will create that employee object
  // Loop throu the create team function until user is done from creating employees for the team
  // then we will use the employee objects created to render html for the team

  function createManager() {
    console.log('Please build your team 👥');
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'managerName',
          message: "What is the team manager's name?",
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Please enter at least one character.';
          },
        },
        //
        // TODO: YOUR CODE HERE:
        // CREATE REST OF QUESTIONS HERE FOR MANAGER
        // Strongly recommend to add validate property function for id and email
        //
        {
          type: 'input',
          name: 'managerId',
          message: 'What is the ID of the team manager?',
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Please enter an answer.';
          },
        },
        {
          type: 'input',
          name: 'managerEmail',
          message: 'What is the email of the manager?',
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Please enter an answer.';
          },
        },
        {
          type: 'input',
          name: 'managerOfficeNumber',
          message: 'What is the office number of the manager?',
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Please enter an answer.';
          },
        }

      ])
      .then((answers) => {
        const manager = new Manager(
          answers.managerName,
          answers.managerId,
          answers.managerEmail,
          answers.managerOfficeNumber
        );
        teamMembers.push(manager);
        idArray.push(answers.managerId);
        createTeam();
      });
  }

  function createTeam() {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'memberChoice',
          message: 'Which type of team member would you like to add?',
          choices: [
            'Engineer',
            'Intern',
            "I don't want to add any more team members",
          ],
        },
      ])
      .then((userChoice) => {
        switch (userChoice.memberChoice) {
          case 'Engineer':
            addEngineer();
            break;
          case 'Intern':
            addIntern();
            break;
          default:
            buildTeam();
        }
      });
  }

  function addEngineer() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'engName',
          message: 'What is the name of the Engineer?',
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Please enter an answer.';
          },
        },
        {
          type: 'input',
          name: 'engId',
          message: 'What is the ID of the Engineer?',
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Please enter an answer.';
          },
        },
        {
          type: 'input',
          name: 'engEmail',
          message: 'What is the email of the Engineer?',
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Please enter an answer.';
          },
        },
        {
          type: 'input',
          name: 'engGithub',
          message: 'What is the Github username of the Engineer?',
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Please enter an answer.';
          },
        }
        //
        // TODO: YOUR CODE HERE
        // CREATE OBJECTS OF QUESTIONS FOR ENGINEER
        //
      ])
      .then((answers) => {
        const engineer = new Engineer(
          answers.engName,
          answers.engId,
          answers.engEmail,
          answers.engGithub
        );
        teamMembers.push(engineer);
        idArray.push(answers.engId)
        //
        // TODO: YOUR CYOUR CODE HERE
        // 1. CREATE A VARIABLE TO STORE THE ENGINEER OBJECT INSTANTIATED WITH THE ENGINEER CLASS, PASSING ANSWERS PROPERTIES AS INPUT AURGUMENTS
        //    TO THE ENGINEER CLASS CONSTRUCTOR
        // 2. ADD (PUSH) THE ENGINEER VARIABLE TO the teamMembers ARRAY
        // 3. ADD (PUSH) THE ENGINERR ID TO THE idArray ARRAY
        //

        createTeam();
      });
  }

  function addIntern() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'internName',
          message: 'What is the name of the intern?',
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Please enter an answer.';
          },
        },
        {
          type: 'input',
          name: 'internId',
          message: 'What is the ID of the intern?',
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Please enter an answer.';
          },
        },
        {
          type: 'input',
          name: 'internEmail',
          message: 'What is the email of the intern?',
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Please enter an answer.';
          },
        },
        {
          type: 'input',
          name: 'internSchool',
          message: 'What is the school of the intern?',
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Please enter an answer.';
          },
        }
        //
        // TODO: YOUR CODE HERE
        // CREATE OBJECTS OF QUESTIONS FOR INTERN
        //
      ])
      .then((answers) => {
        const intern = new Intern(
          answers.internName,
          answers.internId,
          answers.internEmail,
          answers.internSchool
        );

        teamMembers.push(intern);
        idArray.push(answers.internId);
        //
        // TODO: YOUR CODE HERE
        // 1. CREATE A VARIABLE TO STORE THE INTERN OBJECT INSTANTIATED WITH THE INTERN CLASS, PASSING ANSWERS PROPERTIES AS INPUT AURGUMENTS
        //    TO THE INTERN CLASS CONSTRUCTOR
        // 2. ADD (PUSH) THE INTERN VARIABLE TO the teamMembers ARRAY
        // 3. ADD (PUSH) THE INTERN ID TO THE idArray ARRAY
        //
        createTeam();
      });
  }

  function buildTeam() {
    // Create the output directory if the dist path doesn't exist
    if (!fs.existsSync(DIST_DIR)) {
      fs.mkdirSync(DIST_DIR);
    }
    fs.writeFileSync(distPath, render(teamMembers), 'utf-8');
  }

  createManager();
}

appMenu();
