// Todo List 


let inputTodo = prompt("What would you like Todo?");
// const addTodo = "add";
const todoList = [];
// const listAll = "list";
// const removeTodo = "delete";
// const quitApp = "quit";

while ( inputTodo.toLocaleLowerCase() !== "quit" && inputTodo.toLocaleLowerCase() !== "q"){

    if (inputTodo === "add"){
        const newTodo = prompt("Enter a new Todo:")
        todoList.push(newTodo);
        console.log(`${newTodo} added to list`);

    } else if (inputTodo === "list"){
        console.log("*****************")
        for (let i=0; i < todoList.length; i++){
            console.log(`${i}: ${todoList[i]}`)
        }
        console.log("*****************")

    } else if (inputTodo === "delete"){
        const index = parseInt(prompt("Enter index of todo to delete"));
        if (!Number.isNaN(index)) {
            todoList.splice(index,1);
            console.log("Todo Removed");
        } else {
            console.log("Invalide Index");
        }
    }
    inputTodo = prompt("What would you like Todo?");
}
console.log("YOU QUIT THE APP!!!!");










