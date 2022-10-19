import 'source-map-support/register'
<<<<<<< HEAD
<<<<<<< Updated upstream

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'
=======
import { APIGatewayProxyHandler,APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
//import * as middy from 'middy'
//import { cors, httpErrorHandler } from 'middy/middlewares'
import { deleteTodo } from '../../businessLogic/todos'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'
>>>>>>> Stashed changes

import { deleteTodo } from '../../helpers/todos'
=======
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'
import { deleteTodo } from '../../businessLogic/todos'
>>>>>>> 04f5a53847c00665964bab72fc275364420fd592
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'

const logger = createLogger('deleteTodo')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    
    console.log("Processing Event", event);
    const userId = getUserId(event)
    const todoId = event.pathParameters.todoId;
    
    // TODO: Remove a TODO item by id
<<<<<<< Updated upstream
    const userId: string = getUserId(event)
    await deleteTodo(userId, todoId)
    logger.info(`Todo item has been deleted successfully;
    id: ${todoId}`)
    
    return {
      statusCode: 204,
      headers : {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({})
    }
  }
)

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
=======
    //const userId: string = getUserId(event)
    const deleteData = await deleteTodo(todoId, userId);

    logger.info(`Todo item has been deleted successfully;
    id: ${todoId}`)
    
    return {
      statusCode: 204,
      headers : {
        "Access-Control-Allow-Origin": "*"
      },
      body: deleteData,
    }
  };
>>>>>>> Stashed changes
