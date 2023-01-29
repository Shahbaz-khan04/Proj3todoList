#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
figlet("Todo List!", function (err, data) {
    if (err) {
        console.log(chalk.red("Something went wrong..."));
        console.log(err);
        return;
    }
    console.log(chalk.blue(data));
});
let todoList = [];
async function RepeatAgain() {
    const answer = await inquirer.prompt([
        {
            name: "repeatAgain",
            type: "list",
            message: "Do you want to Repeat again?",
            choices: ["yes", "no"],
        },
    ]);
    return answer.repeatAgain === "yes" || answer.repeatAgain === "Yes"
        ? true
        : false;
}
async function TodoList() {
    let startAgain = true;
    do {
        const answer = await inquirer.prompt([
            {
                name: "option",
                type: "list",
                message: "What do you want to do?",
                choices: ["Add Item", "Display Item", "Remove Item"],
            },
        ]);
        if (answer.option === "Add Item") {
            const item = await inquirer.prompt([
                {
                    name: "newItem",
                    type: "input",
                    message: "Enter your new item?",
                },
            ]);
            todoList.push(item.newItem);
            startAgain = await RepeatAgain();
        }
        else if (answer.option === "Display Item") {
            if (todoList.length === 0) {
                console.log(chalk.red("No item to display"));
            }
            todoList.forEach((element) => console.log(element));
            startAgain = await RepeatAgain();
        }
        else if (answer.option === "Remove Item") {
            if (todoList.length === 0) {
                console.log(chalk.red("No item to display"));
            }
            else {
                let removeItem = await inquirer.prompt([
                    {
                        name: "item",
                        type: "input",
                        message: "Enter your item to remove?",
                    },
                ]);
                if (todoList.includes(removeItem.item) === true) {
                    let index = todoList.indexOf(removeItem.item);
                    if (index !== -1) {
                        console.log(`${todoList[index]} is removed.`);
                        todoList.splice(index, 1);
                    }
                }
                else
                    console.log(chalk.red("Item not found!"));
            }
            startAgain = await RepeatAgain();
        }
    } while (startAgain !== false);
}
setTimeout(() => {
    TodoList();
}, 1000);
