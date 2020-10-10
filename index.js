const fs = require("fs");
const util = require("util");
const axios = require("axios");
const inquirer = require("inquirer");
// const { log } = require("console");


const writeFileAsync = util.promisify(fs.writeFile); 


function promptQuestions () {
    return inquirer.prompt ([
        {
            type: "ipnut",
            message: "What is your Github username?",
            name: "user_name",
        },
        {
            type: "ipnut",
            message: "What is your email address",
            name: "user_email",
        },
        {
            type: "ipnut",
            message: "What is the title of your project?",
            name: "title",
        },
        {
            type: "ipnut",
            message: "Please write a short description of your project",
            name: "project_description",
        },
        {
            type: "list",
            message: "What kind of liscense should your project have?",
            choices: ["MIT","Apache 2.0","GPL 3.0","BSD 3-Clause","None"],
            name: "project_liscense",
        },
        {
            type: "ipnut",
            message: "What command should be run to install dependencies?",
            name: "project_dependencies",
        },
        {
            type: "ipnut",
            message: "What command should be run to run tests?",
            name: "project_tests",
        },
        {
            type: "ipnut",
            message: "What does the user need to know about using the repo?",
            name: "project_usage",
        },
    ]);
};

function generateMD (data) {

    console.log(data.project_liscense);

    let badge = "";

    let githubLink = "https://github.com/" + data.user_name;

    if (data.project_liscense === "MIT") {
        badge = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)"
    } else if (data.project_liscense === "Apache 2.0"){
        badge = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)"
    } else if (data.project_liscense === "GPL 3.0"){
        badge = "[![GPLv3 license](https://img.shields.io/badge/License-GPLv3-blue.svg)](http://perso.crans.org/besson/LICENSE.html)"
    } else if (data.project_liscense === "BSD 3-Clause"){
        badge = "[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)"
    } else if (data.project_liscense === "none"){
        
    } 



let newMD = 

`
# ${data.title}

${badge}

## Description

${data.project_description}

## Table of Contents

* [Installation](#installation)

* [Usage](#usage)

* [License](#license)

* [Contributing](#contributing)

* [Test](#test)

* [Questions](#questions)

## Installation

To install necassary dependancies please use the following command(s): 

\`\`\`
${data.project_dependencies}
\`\`\`

## Usage 

${data.project_usage}

## License

${data.project_liscense}

## Contributing

${data.gitName}

## Tests

To run tests, use the following command(s):

\`\`\`
${data.project_tests}
\`\`\`

## Questions 

If you have any questions about the repo, want to open an issue or contact me directly please reach out to ${data.user_email}. Check out more of my work at [Goodlvn](${githubLink}).

![github profile picture](${data.avatar}=100x)
`

return newMD;
    
};

async function createMDFile (){
    try {
        let answers = await promptQuestions();


        //using spread operator 
        let data = {...answers};
    
        console.log("answers", data);
    
    
        const queryUrl = "https://api.github.com/users/" + data.username;
        
      await axios 
                .get(queryUrl)
                .then(function(r){
                    console.log(r.data.name);
            
                    data.gitName = r.data.name;
            
                    data.avatar = r.data.avatar_url;
            
                });
    
        console.log(data);
    
    
    
        let markDown = await generateMD(data);
    
       await writeFileAsync("README.md", markDown, "utf8");
    } catch(err) {
        console.log(err);
    }
};

createMDFile();
