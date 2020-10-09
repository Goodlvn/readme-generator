const fs = require("fs");
const util = require('util');
const inquirer = require("inquirer");

const writeFileAsync = util.promisify(fs.writeFile); 

function promptQuestions () {
    return inquirer.prompt ([
        {
            type: "ipnut",
            message: "what is your name?",
            name: "username",
        },
    ]);
};

function generateMD (answers) {

let newMD = 
`
# title
## I am a mark down file

test weeee!!

also my name is ${answers.username}!
`

return newMD;
    
};

async function createMDFile (){
    let answers = await promptQuestions();
    let markDown = await generateMD(answers);

    writeFileAsync("README.md", markDown, "utf8");
};

createMDFile();
