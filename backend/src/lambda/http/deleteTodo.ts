import 'source-map-support/register'
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { deleteTodo } from '../../businessLogic/todos'
//import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'


const logger = createLogger('deleteTodo')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    
    console.log("Processing Event", event);

    const authorization = event.headers.Authorization;
    const split = authorization.split('');
    const jwtToken = split[1];

    //const userId = getUserId(event);
    const todoId = event.pathParameters.todoId;
    
    const deleteData = await deleteTodo(todoId, jwtToken);

    logger.info(`Todo item has been deleted successfully;
    id: ${todoId}`)
    
    return {
      statusCode: 204,
      headers : {
        "Access-Control-Allow-Origin": "*",
      },
      body: deleteData,
    }
  };