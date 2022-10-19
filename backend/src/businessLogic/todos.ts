<<<<<<< HEAD
<<<<<<< Updated upstream
import { TodosAccess } from './todosAcess'
import { AttachmentUtils } from './attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
import * as createError from 'http-errors'
import {parseUserId} from "../auth/utils"
=======
import { TodoItem } from "../models/TodoItem";
import { UpdateTodoRequest } from "../requests/UpdateTodoRequest";
import { CreateTodoRequest } from "../requests/CreateTodoRequest";
import { TodoAccess } from "../dataLayer/todoAccess";
import { parseUserId } from "../auth/utils";
import { TodoUpdate } from "../models/TodoUpdate";
const todoAccess = new TodoAccess();
>>>>>>> 04f5a53847c00665964bab72fc275364420fd592

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

<<<<<<< HEAD
export function createTodo(createTodoRequest:CreateTodoRequest, jwtToken:string): Promise<TodoItem[]>{
    const userId = parseUserId(jwtToken);
    const todoId = uuid.v4();
    const s3BucketName = process.env.ATTACHMENT_S3_BUCKET

    return TodosAccess.createToDo({
        userId: userId,
        todoId: todoId,
        attachmentUrl: `https://${s3BucketName}.s3.amazonaws.com/${todoId}`,
        createdAt: new Date().getTime().toString,
        done: false,
        ...createTodoRequest,
    });
}
export function updateTodo(updateTodoRequest:UpdateTodoRequest, todoId:string, jwtToken:string): Promise<TodoItem[]>{
    const userId = parseUserId(jwtToken);
    return toDosAccess.updateTodo(updateTodoRequest, todoId, userId);  
}
export function deleteTodo(todoId:string, jwtToken:string): Promise<string>{
    const userId = parseUserId(jwtToken);
    return toDosAccess.deleteTodo(todoId, userId);  
}
export function createAttachmentPresignedUrl(todoId:string): Promise<string>{
    return toDosAccess.createAttachmentPresignedUrl(todoId);  
=======
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
>>>>>>> Stashed changes
=======
export const createAttachmentPresignedUrl = async (todoId: string) => {
    return todoAccess.generateUploadUrl(todoId);
>>>>>>> 04f5a53847c00665964bab72fc275364420fd592
}



