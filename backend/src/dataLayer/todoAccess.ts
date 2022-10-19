import { DocumentClient } from "aws-sdk/clients/dynamodb";
import * as AWS from "aws-sdk";
//import { CreateTodoRequest } from "../requests/CreateTodoRequest";
//import { UpdateTodoRequest } from "../requests/UpdateTodoRequest";
import { TodoItem } from "../models/TodoItem";
//
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

  async deleteTodo(userId: string, todoId: string): Promise<string> {
      console.log("Deleting todo")

      const params = {
        TableName: this.todosTable,
          Key: {
              "userId": userId,
              "todoId": todoId
      },
      
          };
          const result = await this.docClient.delete(params).promise();
          console.log(result);
          return "" as string;
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

  async createTodo(todoItem: TodoItem): Promise<TodoItem> {
      console.log("Creating new todo")
      
      const params = {
        TableName: this.todosTable,
          Item: todoItem
      };

      const result = await this.docClient.put(params).promise();
      console.log(result);
      return todoItem as TodoItem;
  }

  async updateTodo(todoUpdate: TodoUpdate, userId: string, todoId: string):Promise<TodoUpdate> {
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
              ":name": todoUpdate['name'],
              ":dueDate": todoUpdate['dueDate'],
              ":done": todoUpdate['done']
          },
         
          ReturnValues: "ALL_NEW"
    };
    const result = await this.docClient.update(params).promise();
      console.log(result);
      const attributes = result.Attributes;

      return attributes as TodoUpdate;
      
  }

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
