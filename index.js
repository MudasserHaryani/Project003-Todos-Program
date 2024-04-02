#! /usr/bin/env node
import inquirer from "inquirer";
let todos = [];
async function main() {
    let condition = true;
    while (condition) {
        let addTask = await inquirer.prompt([
            {
                name: "todo",
                type: "input",
                message: "What do you want to add to your Todos?",
                when: () => todos.length === 0 || todos[todos.length - 1] !== "" // Ask when there are no tasks or the last task is not empty
            },
            {
                name: "action",
                type: "list",
                message: "Select an action:",
                choices: ["Add more", "Delete a task", "Finish"],
                when: () => todos.length > 0 || todos[todos.length - 1] !== "" // Show when there are tasks or the last task is not empty
            },
            {
                name: "deleteTask",
                type: "list",
                message: "Select a task to delete:",
                choices: todos,
                when: (answers) => answers.action === "Delete a task" && todos.length > 0 // Show when there are tasks and the user chose to delete
            }
        ]);
        let { todo, action, deleteTask } = addTask;
        if (action === "Delete a task") {
            todos = todos.filter(task => task !== deleteTask); // Remove the selected task
        }
        else if (todo !== undefined && todo !== "") {
            todos.push(todo); // Push only if todo is defined and not empty
        }
        if (action === "Finish") {
            condition = false;
        }
    }
    console.log("Your Todos:");
    todos.forEach((task, index) => {
        console.log(`${index + 1}. ${task}`);
    });
}
main();
