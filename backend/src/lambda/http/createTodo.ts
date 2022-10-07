import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { getUserId } from '../utils';
import { createTodo } from '../../businessLogic/todos'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const authorization = event.headers.Authorization;
    const split = authorization.split('');
    const jwtToken = split[1];

    const newTodo: CreateTodoRequest = JSON.parse(event.body)
    const toDoItem = await createTodo(newTodo, jwtToken);

    return {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Origin" : "*",
      },
      body: JSON.stringify({
        "item": toDoItem
      })
    }

    const AWS = require('aws-sdk')
    const uuid = require('uuid')
    // TODO: Implement creating a new TODO item
    const docClient = new AWS.DynamoDB.DocumentClient()
    const todosTable = process.env.TODOS_TABLE
    //create a new item
    exports.handler = async (event) => {
      console.log('Processing event: ', event)
      const userId = uuid.v4()
      const todoId = uuid.v4()
    
      const parsedBody = JSON.parse(event.body)
    
      const newTodo = {
        id: todoId,
        userid: userId,
        name: 
        dueDate
        timestamp: 
        ...parsedBody
      }
    
      await docClient.put({
        TableName: todosTable,
        id: todoId,
        userid: userId,
        name: createTodoRequest.name,
        dueDate: createTodoRequest.dueDate,
        timestamp: new Date().toISOString()
      }).promise()
    
      return {
        statusCode: 201,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          newItem
        })
      }
    }

    return undefined
)

handler.use(
  cors({
    credentials: true
  })
)
