const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

inquirer.prompt([
    // Manager
    {
        type: 'input',
        name: 'managerName',
        message: "Enter the manager's name."
    },
    {
        type: 'input',
        name: 'managerId',
        message: "Enter the manager's ID."
    },
    {
        type: 'input',
        name: 'managerEmail',
        message: "Enter the manager's email.",
        validate: function (email) {
            valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

            if (valid) {
                return true;
            } else {
                console.log(".  Please enter a valid email")
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'managerOffice',
        message: "Enter the manager's office number."
    },
    // Engineer
    {
        type: 'input',
        name: 'engineerName',
        message: "Enter the engineer's name."
    },
    {
        type: 'input',
        name: 'engineerId',
        message: "Enter the engineer's ID."
    },
    {
        type: 'input',
        name: 'engineerEmail',
        message: "Enter the engineer's email.",
        validate: function (email) {
            valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

            if (valid) {
                return true;
            } else {
                console.log(".  Please enter a valid email")
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'engineerGithub',
        message: "Enter the engineer's github username."
    },
    // Intern
    {
        type: 'input',
        name: 'internName',
        message: "Enter the intern's name."
    },
    {
        type: 'input',
        name: 'internId',
        message: "Enter the intern's ID."
    },
    {
        type: 'input',
        name: 'internEmail',
        message: "Enter the intern's email.",
        validate: function (email) {
            valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

            if (valid) {
                return true;
            } else {
                console.log(".  Please enter a valid email")
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'internSchool',
        message: "Enter the intern's school."
    }
]).then((res) => {
    const myManager = new Manager(res.managerName, res.managerId, res.managerEmail, res.managerOffice);
    const myEngineer = new Engineer(res.engineerName, res.engineerId, res.engineerEmail, res.engineerGithub);
    const myIntern = new Intern(res.internName, res.internId, res.internEmail, res.internSchool);

    let teamArr = [myManager, myEngineer, myIntern];

    const html = render(teamArr);

    fs.writeFile('./output/team.html', html, (err) => {
        if (err) throw err;
        console.log("File Saved.");
    })
});
