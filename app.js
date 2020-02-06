const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");

async function init(){
    console.log("Get read to build you team!");

    let teamTemplates = "";
    let teamNum;

    await inquirer.prompt(
        {
            type: "number",
            message: "How many people are in your team?",
            name: "teamNum"
        }
    )
    .then((data) => {
        teamNum = data.teamNum + 1;
    });

    if (teamNum === 0){
        console.log("No team? Let's wrap this up then...");
        return;
    }

    for(i = 1; i < teamNum; i++){

        let name;
        let id;
        let title;
        let email;

        await inquirer.prompt([ 
            {
                type: "input",
                message: `What's employee (${i})'s full name?`,
                name: "name"
            },
            {
                type: "input",
                message: `What is the employee (${i})'s id number?`,
                name: "id"
            },
            {
                type: "input",
                message: `What is the employee (${i})'s email address?`,
                name: "email"
            },
            {
                type: "list",
                message: `what the employee (${i})'s job title?`,
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
                await inquirer.prompt([
                    {
                        type: "input",
                        message: "What is your Manager's Office Number?",
                        name: "officeNumber"
                    }
                ])
                .then((data) => {
                    const manager = new Manager(name, id, email, data.officeNumber);
                    teamMember = fs.readFileSync("templates/manager.html");
                    teamTemplates = teamTemplates + "\n" + eval('`'+ teamMember +'`');
                });
                break;

            case "Intern":
                await inquirer.prompt([
                    {
                        type: "input",
                        message: "What school is your Intern attending?",
                        name: "school"
                    }
                ])
                .then((data) => {
                    const intern = new Intern(name, id, email, data.school);
                    teamMember = fs.readFileSync("templates/intern.html");
                    teamTemplates = teamTemplates + "\n" + eval('`'+ teamMember +'`');
                });
                break;

            case "Engineer":
                await inquirer.prompt([
                    {
                        type: "input",
                        message: "What is your Engineer's GitHub?",
                        name: "github"
                    }
                ])
                .then((data) => {
                    const engineer = new Engineer(name, id, email, data.github);
                    teamMember = fs.readFileSync("templates/engineer.html");
                    teamTemplates = teamTemplates + "\n" + eval('`'+ teamMember +'`');
                });
                break;

        }

    }

    const mainHTML = fs.readFileSync("templates/main.html");
    
    teamTemplates = eval('`'+ mainHTML +'`');

    fs.writeFile("output/employee_summary.html", teamTemplates, function(err) {

        if (err) {
          return console.log(err);
        }
        console.log("Congratulations! You've created your team!");
      });
}

init();