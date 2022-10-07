import { TodosAccess } from './todosAcess'
import { AttachmentUtils } from './attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
import * as createError from 'http-errors'
import {parseUserId} from "../auth/utils"

// TODO: Implement businessLogic
//const uuidv4 = require('uuid/v4')
const toDosAccess = new TodosAccess();

export async function getTodosForUser(jwtToken:string): Promise<TodoItem[]>{
    const userId = parseUserId(jwtToken);
    return toDosAccess.getTodosForUser(userId);
}

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
}






