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


async function start() {
    console.log("Let's make your Dream Team!");
    let teamHTML = "";

    await inquirer.prompt(
        {
@@ -127, 28 + 96, 117 @@async function start() {
        await inquirer.prompt(managerQ)
            .then((data) => {
                const manager = new Manager(name, id, email, data.officeNo);
                team.push(manager);

                teamMember = fs.readFileSync("templates/manager.html");

                teamHTML = teamHTML + "\n" + eval('`' + teamMember + '`');

                // team.push(manager);
            });
        break;
            case "Intern":
        await inquirer.prompt(internQ)
            .then((data) => {
                const intern = new Intern(name, id, email, data.school);
                team.push(intern);

                teamMember = fs.readFileSync("templates/intern.html");

                teamHTML = teamHTML + "\n" + eval('`' + teamMember + '`');
            });
        break;
            case "Engineer":
        await inquirer.prompt(engineerQ)
            .then((data) => {
                const engineer = new Engineer(name, id, email, data.github);
                team.push(engineer);

                teamMember = fs.readFileSync("templates/engineer.html");

                teamHTML = teamHTML + "\n" + eval('`' + teamMember + '`');

            });
        break;
    }
}

console.log(team[0].name);
console.log(team[0].getRole());
//console.log(teamMember);



teamHTML = teamHTML + "\n" + eval('`'+ teamMember +'`');

// team.push(manager);
});
break;
case "Intern":
@@ -128,6 +127,21 @@ async function start(){
}
}

const mainHTML = fs.readFileSync("templates/main.html");

teamHTML = eval('`'+ mainHTML +'`');

fs.writeFile("output/DreamTeam.html", teamHTML, function(err) {

if (err) {
return console.log(err);
}

console.log("Success!");

});


//console.log(teamMember);



console.log(teamHTML);
    //generateTeamHTML(team);
}

async function generateTeamHTML(teamArray) {
    let teamHTML;

    for (i = 0; i < teamArray.length; i++) {

        if (teamArray[i].getRole() == "Manager") {
            fs.readFile("templates/engineer.html", "utf8", function (err, htmlFile) {
                if (err) { return console.log(err); }
                console.log(teamArray[i].name);
                console.log(teamArray[i].getRole);
                console.log(teamArray[i].id);
                console.log(teamArray[i].email);
                console.log(teamArray[i].officeNumber);
                //teamHTML = teamHTML + eval('`'+ htmlFile +'`');
            });
        }
        else if (teamArray[i].getRole() == "Intern") {
            fs.readFile("templates/intern.html", "utf8", (err, htmlFile) => {
                if (err) { return console.log(err); }
                //teamHTML = teamHTML + eval('`'+ htmlFile +'`');
            });
        }
        else if (teamArray[i].getRole() == "Engineer") {
            fs.readFile("templates/engineer.html", "utf8", (err, htmlFile) => {
                if (err) { return console.log(err); }
                //teamHTML = teamHTML + eval('`'+ htmlFile +'`');
            });
        }
    }

    console.log(teamHTML);
}

start(); 