import addTodo from './addTodo';
import deleteTodo from './deleteTodo';
import getTodos from './getTodos';
import updateTodo from './updateTodo';

import Todo from './todo';

type AppSyncEvent = {
    info: {
        fieldName: string
    },
    arguments: {
        todoId: string,
        todo: Todos
    }
}
type Todos = {
    id: string
    title: string
    done: string
}

exports.handler = async (event: AppSyncEvent) => {
    switch (event.info.fieldName) {
        case "addTodo":
            event.arguments.todo.id = "mk"+ Math.random();
            return await addTodo(event.arguments.todo);
        case "getTodos":
            return await getTodos();
        case "deleteTodo":
            return await deleteTodo(event.arguments.todoId);
        case "updateTodo":
            return await updateTodo(event.arguments.todo);
        default:
            return null;
    }
}