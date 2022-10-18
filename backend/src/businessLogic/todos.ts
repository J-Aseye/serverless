import { TodoItem } from "../models/TodoItem";
import { UpdateTodoRequest } from "../requests/UpdateTodoRequest";
import { CreateTodoRequest } from "../requests/CreateTodoRequest";
import { TodoAccess } from "../dataLayer/todoAccess";
import { parseUserId } from "../auth/utils";
import { TodoUpdate } from "../models/TodoUpdate";
const todoAccess = new TodoAccess();

export const deleteTodo = async (userId: string, todoId: string) => {
    await todoAccess.deleteTodo(userId, todoId);
}

export const getTodosForUser = async (userId: string): Promise<TodoItem[]> => {
    const todos = await todoAccess.getUserTodos(userId);
    return todos;
}

export const createTodo = async (data: CreateTodoRequest, userId: string): Promise<TodoItem> => {
    const todoItem = await todoAccess.createTodo(data, userId);
    return todoItem;
}

export const updateTodo = async (data: UpdateTodoRequest, todoId: string, jwtToken:string):Promise<TodoUpdate> => {
    const userId = parseUserId(jwtToken);
    return todoAccess.updateTodo(data, userId, todoId);
}

export const createAttachmentPresignedUrl = async (todoId: string) => {
    return todoAccess.generateUploadUrl(todoId);
}



