import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createLogger } from '../utils/logger'
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate';
import { timeStamp } from 'console'

//const XAWS = AWSXRay.captureAWS(AWS)
const XAWS = require('aws-xray-sdk')
//const AWS = require('aws-sdk')

const logger = createLogger('TodosAccess')

logger.info('A new TODO Item was created', {
// Additional information stored with a log statement
todoId: 'current'
})

// TODO: Implement the dataLayer logic
export class TodosAccess {

    constructor(
      private readonly docClient: DocumentClient = getDynamoDBClient(),
      private readonly todosTable = process.env.TODOS_TABLE) {
    }

    async getTodosForUser(): Promise<TodoItem[]> {
      
        console.log('Getting all todo items')
    
        const result = await this.docClient.query({
          TableName: this.todosTable
        }).promise()
    
        const items = result.Items
        return items as TodoItem[]
      }
      async updateTodo(): Promise<TodoUpdate> {
        const dueDate = new Date().getTime().toString;
        const newTodo = JSON.parse{event.body}
    

      const updatedTodo = {
        name: n,
        dueDate: 
        timestamp: 
        ...parsedBody
      }
        console.log('Updating todo items')
    
        const result = await this.docClient.update({
          TableName: this.todosTable
        }).promise()
        const name: string
        const  dueDate: string
        done: boolean
        const items = result.Items
        return items as TodoItem[]
      }

      
    }

    function getDynamoDBClient() {
        if (process.env.IS_OFFLINE) {
          console.log('Creating a local DynamoDB instance')
          return new XAWS.DynamoDB.DocumentClient({
            region: 'localhost',
            endpoint: 'http://localhost:3000'
          })
        }
      
        return new XAWS.DynamoDB.DocumentClient()
      }

      
      

    function createDynamoDBClient() {
        if (process.env.IS_OFFLINE) {
          console.log('Creating a local DynamoDB instance')
          return new XAWS.DynamoDB.DocumentClient({
            region: 'localhost',
            endpoint: 'http://localhost:3000'
          })
        }
      
        return new XAWS.DynamoDB.DocumentClient()
      }
