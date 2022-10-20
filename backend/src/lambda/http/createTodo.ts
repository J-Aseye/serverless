import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { getUserId } from '../utils';
import { createTodo } from '../../businessLogic/todos';
import { createLogger } from '../../utils/logger'

const logger = createLogger('createTodo')

export const handler:APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
     
    console.log("Processing Event", event);
    // TODO: Implement creating a new TODO item
    const userId = getUserId(event)
    // TODO: Implement creating a new TODO item
    const newTodo: CreateTodoRequest = JSON.parse(event.body)

    const toDoItem = await createTodo(newTodo, userId)

    logger.info(`Todo item created;
    id: ${toDoItem.todoId}`)
    
    return {
      statusCode: 201,
      headers : {
        "Access-Control-Allow-Origin": "*"
      },

      body: JSON.stringify({
        "item": toDoItem
      })
    }
  };
