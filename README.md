
# readme-generator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

This is a commandline app for busy developers who want to make an on the fly README.md document. All you have to do is install some prerequisites and then you will be able to answer the appropriate questions in your terminal so you can generate a great readme for your next project. 

## Table of Contents

* [Installation](#installation)

* [Usage](#usage)

* [Code](#Code)

* [Standouts](#Standouts)

* [License](#license)

* [Contributing](#contributing)

* [Questions](#questions)

## Installation

To install necassary dependancies please use the following command(s): 

```
npm install

npm inquirer

npm axios
```

## Usage 

Once you have the necassary dependancies installed then you can start the application by initializing the index.js folder inside of your termianl 

```
node index.js
```

## Code

```
async function createMDFile (){
    try {
        let answers = await promptQuestions();


        //using spread operator 
        let data = {...answers};
    
        const queryUrl = "https://api.github.com/users/" + data.username;
        
      await axios 
                .get(queryUrl)
                .then(function(r){

                    data.gitName = r.data.name;
            
                    data.avatar = r.data.avatar_url;
            
                });
    
        let markDown = await generateMD(data);
    
       await writeFileAsync("README.md", markDown, "utf8");
    } catch(err) {
        console.log(err);
    }
};
```

The hardest part of this project for me was understanding how async functions and axios calls work. After completing this project I find myself understanding async functions a bit more. We use the await function in order to let javascript know the order in which we want to execute our code. 

Before adding await to my axios call I was not able to get the valued from the call fast enough. The writeFileAsync code would generate the markdown faster than I could get the values. Once I did add the await the string template literal was able to take in the values we called from the github api!

## Standouts

This homework assignment really stood out to me because it was our first one that had nothing to do with the browser. It was our first taste at backend programming. Although there is less instant gratification than is the case with more browser based code, it was really interesting to learn more about how flexible javascript. 

This project also introduced us to npm (node package manager). There is a lot of prewritten code that we can use to make really cool projects. I am excited to see wha the difference is in implementing npm dependancies and using a js or css library.

## License

MIT

## Contributing

Jonathan-David Martinez

## Questions 

If you have any questions about the repo, want to open an issue or contact me directly please reach out to focus4ursoul@gmail.com. Check out more of my work at [Goodlvn](https://github.com/Goodlvn).

![github profile picture](https://avatars3.githubusercontent.com/u/37821521?v=4=100x)
