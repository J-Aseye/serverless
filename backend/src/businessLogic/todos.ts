import { TodoItem } from "../models/TodoItem";
import { UpdateTodoRequest } from "../requests/UpdateTodoRequest";
import { CreateTodoRequest } from "../requests/CreateTodoRequest";
import { TodoAccess } from "../dataLayer/todoAccess";
import { TodoUpdate } from "../models/TodoUpdate";

const uuidv4 = require('uuid/v4')
const todoAccess = new TodoAccess();


export function deleteTodo(todoId: string, userId: string): Promise<string> {
    //const userId = parseUserId(jwtToken);
    return todoAccess.deleteTodo(todoId, userId);
}

export async function getTodosForUser(userId: string): Promise<TodoItem[]> {
   // const userId = parseUserId(jwtToken);
    const todos = await todoAccess.getUserTodos(userId);
    return todos;
}

export function createTodo(createTodoRequest: CreateTodoRequest, userId: string): Promise<TodoItem> {
    //const userId = parseUserId(jwtToken);
    const todoId = uuidv4();
    const s3Bucket = process.env.ATTACHMENT_S3_BUCKET;

    return todoAccess.createTodo({
     userId: userId,
     todoId: todoId,
     attachmentUrl: `https://${s3Bucket}.s3.amazonaws.com/${todoId}`,
     createdAt: new Date().getTime().toString(),
     done: false,
     ...createTodoRequest,
    });
}

export function updateTodo(updateTodoRequest: UpdateTodoRequest, todoId: string, userId:string):Promise<TodoUpdate> {
    //const userId = parseUserId(jwtToken);
    return todoAccess.updateTodo(updateTodoRequest, todoId, userId);
}

export function generateUploadUrl(userId:string, todoId: string): Promise<string> {
    return todoAccess.generateUploadUrl(userId,todoId);
}

