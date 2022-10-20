import { DocumentClient } from "aws-sdk/clients/dynamodb";
import * as AWS from "aws-sdk";
<<<<<<< Updated upstream
<<<<<<< HEAD
//import { CreateTodoRequest } from "../requests/CreateTodoRequest";
//import { UpdateTodoRequest } from "../requests/UpdateTodoRequest";
import { TodoItem } from "../models/TodoItem";
//
=======
import { CreateTodoRequest } from "../requests/CreateTodoRequest";
//import { UpdateTodoRequest } from "../requests/UpdateTodoRequest";
import { TodoItem } from "../models/TodoItem";
import { v4 } from "uuid";
>>>>>>> 04f5a53847c00665964bab72fc275364420fd592
=======
//import { CreateTodoRequest } from "../requests/CreateTodoRequest";
//import { UpdateTodoRequest } from "../requests/UpdateTodoRequest";
import { TodoItem } from "../models/TodoItem";
//
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
<<<<<<< HEAD
=======
>>>>>>> Stashed changes
  async deleteTodo(userId: string, todoId: string): Promise<string> {
      console.log("Deleting todo")

      const params = {
        TableName: this.todosTable,
<<<<<<< Updated upstream
          Key: {
              "userId": userId,
              "todoId": todoId
      },
      
          };
          const result = await this.docClient.delete(params).promise();
          console.log(result);
          return "" as string;
=======
  async deleteTodo(userId: string, todoId: string) {
      await this.docClient.delete({
          TableName: this.todosTable,
          Key: {
              "userId": userId,
              "todoId": todoId
          }
      }).promise();
>>>>>>> 04f5a53847c00665964bab72fc275364420fd592
=======
          Key: {
              "userId": userId,
              "todoId": todoId
      },
      
          };
          const result = await this.docClient.delete(params).promise();
          console.log(result);
          return "" as string;
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
<<<<<<< HEAD
  async createTodo(todoItem: TodoItem): Promise<TodoItem> {
      console.log("Creating new todo")
      
      const params = {
        TableName: this.todosTable,
          Item: todoItem
      };

      const result = await this.docClient.put(params).promise();
=======
  async createTodo(data: CreateTodoRequest, userId: string) {
=======
  async createTodo(todoItem: TodoItem): Promise<TodoItem> {
>>>>>>> Stashed changes
      console.log("Creating new todo")
      
      const params = {
        TableName: this.todosTable,
          Item: todoItem
<<<<<<< Updated upstream
      }).promise();
>>>>>>> 04f5a53847c00665964bab72fc275364420fd592
=======
      };

      const result = await this.docClient.put(params).promise();
>>>>>>> Stashed changes
      console.log(result);
      return todoItem as TodoItem;
  }

<<<<<<< Updated upstream
<<<<<<< HEAD
  async updateTodo(todoUpdate: TodoUpdate, userId: string, todoId: string):Promise<TodoUpdate> {
=======
  async updateTodo(data: TodoUpdate, userId: string, todoId: string):Promise<TodoUpdate> {
>>>>>>> 04f5a53847c00665964bab72fc275364420fd592
=======
  async updateTodo(todoUpdate: TodoUpdate, userId: string, todoId: string):Promise<TodoUpdate> {
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
<<<<<<< HEAD
              ":name": todoUpdate['name'],
              ":dueDate": todoUpdate['dueDate'],
              ":done": todoUpdate['done']
=======
              ":name": data['name'],
              ":dueDate": data['dueDate'],
              ":done": data['done']
>>>>>>> 04f5a53847c00665964bab72fc275364420fd592
=======
              ":name": todoUpdate['name'],
              ":dueDate": todoUpdate['dueDate'],
              ":done": todoUpdate['done']
>>>>>>> Stashed changes
          },
         
          ReturnValues: "ALL_NEW"
    };
    const result = await this.docClient.update(params).promise();
      console.log(result);
      const attributes = result.Attributes;

      return attributes as TodoUpdate;
      
  }

<<<<<<< Updated upstream
<<<<<<< HEAD
  async generateUploadUrl(userId, todoId: string): Promise<string> {
      const url = this.s3Client.getSignedUrl('putObject',{
        Bucket: this.s3Bucket,
        Key: {
          "userId": userId,
          "todoId": todoId
         },
        Expires: this.urlExpiration
      });

    console.log(url);
      return url as string;
       
  }
};
=======
  async generateUploadUrl(todoId: string): Promise<string> {
=======
  async generateUploadUrl(userId, todoId: string): Promise<string> {
>>>>>>> Stashed changes
      const url = this.s3Client.getSignedUrl('putObject',{
        Bucket: this.s3Bucket,
        Key: {
          "userId": userId,
          "todoId": todoId
         },
        Expires: this.urlExpiration
      });

    console.log(url);
      return url as string;
       
  }
<<<<<<< Updated upstream
}
>>>>>>> 04f5a53847c00665964bab72fc275364420fd592
=======
};
>>>>>>> Stashed changes
