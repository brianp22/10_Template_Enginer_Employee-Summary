const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");

let team = [];
let position = "";
let teamSize;

const managerQ = [
    {
        type: "input",
        message: "What is your Manager's Office Number?",
        name: "officeNo"
    }
];

const internQ = [
    {
        type: "input",
        message: "What school is your Intern attending?",
        name: "school"
    }
];

const engineerQ = [
    {
        type: "input",
        message: "What is your Engineer's GitHub?",
        name: "github"
    }
];


const EmployeeQuestions = [ 
    {
        type: "input",
        message: "What is the employee's name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is the employee's id?",
        name: "id"
    },
    {
        type: "input",
        message: "What is the employee's Email?",
        name: "email"
    },
    {
        type: "list",
        message: "what the employee's title?",
        name: "title",
        choices: ["Engineer", "Intern", "Manager"]
    }
];


// inquirer.prompt(managerQ).then(consoleLog)

// function consoleLog(response){
//     console.log(response);
// }


async function start(){
    console.log("Let's make your Dream Team!");

    await inquirer.prompt(
        {
            type: "number",
            message: "How many people are in your team?",
            name: "noOfTeamMem"
        }
    )
    .then((data) => {
        teamSize = data.noOfTeamMem + 1;
    });

    // If Team Size is 0
    if (teamSize === 0){
        console.log("I guess there is no one on your team...");
        return;
    }

    for(i = 1; i < teamSize; i++){

        let name;
        let id;
        let title;
        let email;

        await inquirer.prompt([ 
            {
                type: "input",
                message: `What is employee (${i})'s name?`,
                name: "name"
            },
            {
                type: "input",
                message: `What is the employee (${i})'s id?`,
                name: "id"
            },
            {
                type: "input",
                message: `What is the employee (${i})'s Email?`,
                name: "email"
            },
            {
                type: "list",
                message: `what the employee (${i})'s title?`,
                name: "title",
                choices: ["Engineer", "Intern", "Manager"]
            }
        ])
        .then((data) => {
            name = data.name;
            id = data.id;
            title = data.title;
            email = data.email;
        });

        switch (title){
            case "Manager":
                await inquirer.prompt(managerQ)
                .then((data) => {
                    const manager = new Manager(name, id, email, data.officeNo);
                    team.push(manager);
                });
                break;
            case "Intern":
                await inquirer.prompt(internQ)
                .then((data) => {
                    const intern = new Intern(name, id, email, data.school);
                    team.push(intern);
                });
                break;
            case "Engineer":
                await inquirer.prompt(engineerQ)
                .then((data) => {
                    const engineer = new Engineer(name, id, email, data.github);
                    team.push(engineer);
                });
                break;
        }
    }

    console.log(team[0].name);
    console.log(team[0].getRole());
}

start(); 