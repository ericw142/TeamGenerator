// DO NOT RUN THIS VERSION //
// CURRENTLY BROKEN //
// DO NOT RUN THIS VERSION //

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
let teamArr = [];

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
    {
        type: 'number',
        name: 'engineerCount',
        message: 'How many engineers are on the team?'
    },
    {
        type: 'number',
        name: 'internCount',
        message: 'How many interns are on the team?'
    }
]).then((res) => {
    const myManager = new Manager(res.managerName, res.managerId, res.managerEmail, res.managerOffice);

    teamArr.push(myManager);

    
    for(var i = 0; i < res.engineerCount; i++) {
        await inquirer.prompt([
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
            }
        ]).then((eng) => {
            let myEngineer = new Engineer(eng.engineerName, eng.engineerId, eng.engineerEmail, eng.engineerGithub);
            teamArr.push(myEngineer);
        });
    }

    for(var i = 0; i < internCount; i++) {
        inquirer.prompt([
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
            let myIntern = new Intern(res.internName, res.internId, res.internEmail, res.internSchool);
            teamArr.push(myIntern);
        });
    }

    const html = render(teamArr);

    fs.writeFile('./output/team.html', html, (err) => {
        if (err) throw err;
        console.log("File Saved.");
    })
});
