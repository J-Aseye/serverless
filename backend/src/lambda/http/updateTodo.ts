import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
<<<<<<< Updated upstream
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { updateTodo } from '../../helpers/todos'
=======
import { updateTodo } from '../../businessLogic/todos'
>>>>>>> Stashed changes
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { getUserId } from '../utils'

<<<<<<< Updated upstream
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
    // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
    const userId: string = getUserId(event)
    const update = await updateTodo(userId,todoId,updatedTodo)
=======
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    
    console.log("Processing Event", event);
    const userId = getUserId(event)
    const todoId = event.pathParameters.todoId;
    const updatedTodo: UpdateTodoRequest = JSON.parse(event.body);
    // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
   // const userId = getUserId(event)
   
    const toDoItem = await updateTodo(updatedTodo, userId, todoId);

    logger.info(`Todo with id: ${todoId} has been updated successfully`)
>>>>>>> Stashed changes


    return {
      statusCode: 204,
      body: JSON.stringify({
<<<<<<< Updated upstream
        update
      })
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
        "item":toDoItem
      }),
    };
  };
>>>>>>> Stashed changes
