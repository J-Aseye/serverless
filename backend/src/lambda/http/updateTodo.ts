import 'source-map-support/register'
import { APIGatewayProxyHandler,APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { updateTodo } from '../../businessLogic/todos';
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
//import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'
const logger = createLogger('updateTodo')


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    
    console.log("Processing Event", event);

    const authorization = event.headers.Authorization;
    const split = authorization.split('');
    const jwtToken = split[1];

    //const userId = getUserId(event);
    const todoId = event.pathParameters.todoId;
    const updatedTodo: UpdateTodoRequest = JSON.parse(event.body);

    // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
   // const userId = getUserId(event)
   
    const toDoItem = await updateTodo(updatedTodo, jwtToken, todoId);

    logger.info(`Todo with id: ${todoId} has been updated successfully`)

    return {
      statusCode: 200,
      headers : {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({

        "item":toDoItem
      })
    }
  }
