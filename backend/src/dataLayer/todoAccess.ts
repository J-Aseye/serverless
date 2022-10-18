import { DocumentClient } from "aws-sdk/clients/dynamodb";
import * as AWS from "aws-sdk";
import { CreateTodoRequest } from "../requests/CreateTodoRequest";
//import { UpdateTodoRequest } from "../requests/UpdateTodoRequest";
import { TodoItem } from "../models/TodoItem";
import { v4 } from "uuid";
import { TodoUpdate } from "../models/TodoUpdate";


const AWSXRay = require("aws-xray-sdk");
const XAWS = AWSXRay.captureAWS(AWS);

export class TodoAccess {
  constructor(
      private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
      private readonly s3Client = new XAWS.S3({ signatureVersion: "v4" }),
      private readonly todosTable: string = process.env.TODOS_TABLE,
      private readonly s3Bucket: string = process.env.ATTACHMENT_S3_BUCKET,
      private readonly urlExpiration: number = +process.env.SIGNED_URL_EXPIRATION
  ) {}

  async deleteTodo(userId: string, todoId: string) {
      await this.docClient.delete({
          TableName: this.todosTable,
          Key: {
              "userId": userId,
              "todoId": todoId
          }
      }).promise();
  }

  async getUserTodos(userId: string): Promise<TodoItem[]> {
      const result = await this.docClient.query({
          TableName: this.todosTable,
          KeyConditionExpression: 'userId = :userId',
          ExpressionAttributeValues: {
              ':userId': userId
          }
      }).promise();
      const todos = result.Items;
      return todos as TodoItem[];
  }

  async createTodo(data: CreateTodoRequest, userId: string) {
      console.log("Creating new todo")
      
      const todoItem: TodoItem = {
          todoId: v4(),
          createdAt: new Date().toISOString(),
          done: false,
          userId,
          ...data
      }
      const result = await this.docClient.put({
          TableName: this.todosTable,
          Item: todoItem
      }).promise();
      console.log(result);
      return todoItem as TodoItem;
  }

  async updateTodo(data: TodoUpdate, userId: string, todoId: string):Promise<TodoUpdate> {
    console.log("Updating a todo item")

    const params =  {
            TableName: this.todosTable,
            Key: {
                "userId": userId,
                "todoId": todoId
    },
          UpdateExpression: "Set #name=:name, dueDate=:dueDate, done=:done",
          ExpressionAttributeNames: {
            "#name": "name",
            "#dueDate": "dueDate",
            "#done": "done"
        },
          ExpressionAttributeValues: {
              ":name": data['name'],
              ":dueDate": data['dueDate'],
              ":done": data['done']
          },
         
          ReturnValues: "ALL_NEW"
    };
    const result = await this.docClient.update(params).promise();
      console.log(result);
      const attributes = result.Attributes;

      return attributes as TodoUpdate;
      
  }

  async generateUploadUrl(todoId: string): Promise<string> {
      const url = this.s3Client.getSignedUrl('putObject',{
        Bucket: this.s3Bucket,
        Key: todoId,
        Expires: this.urlExpiration
      });

    console.log(url)
      return url as string;
       
  }
}
