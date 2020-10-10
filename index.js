const fs = require("fs");
const util = require("util");
const axios = require("axios");
const inquirer = require("inquirer");
const { log } = require("console");


const writeFileAsync = util.promisify(fs.writeFile); 


function promptQuestions () {
    return inquirer.prompt ([
        {
            type: "ipnut",
            message: "what is your Github username?",
            name: "username",
        },
    ]);
};

function generateMD (data) {

let newMD = 

`
# title

[![NPM Version](https://img.shields.io/npm/v/npm.svg?style=flat)]()

## I am a mark down file

test weeee!!

also my name is ${data.gitName}!

## github profile picture
![prof pic](${data.avatar}=250x)
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
