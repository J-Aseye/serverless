import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

<<<<<<< HEAD
import { updateTodo } from '../../helpers/todos'
=======
=======
>>>>>>> Stashed changes
import { updateTodo } from '../../businessLogic/todos'
>>>>>>> Stashed changes
=======
import { updateTodo } from '../../businessLogic/todos'
>>>>>>> 04f5a53847c00665964bab72fc275364420fd592
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'
const logger = createLogger('updateTodo')

<<<<<<< Updated upstream
<<<<<<< Updated upstream
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
    // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
<<<<<<< HEAD
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
=======
=======
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    
    console.log("Processing Event", event);
>>>>>>> Stashed changes
    const userId = getUserId(event)
    const todoId = event.pathParameters.todoId;
    const updatedTodo: UpdateTodoRequest = JSON.parse(event.body);
    // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
   // const userId = getUserId(event)
   
    const toDoItem = await updateTodo(updatedTodo, userId, todoId);

    logger.info(`Todo with id: ${todoId} has been updated successfully`)
>>>>>>> 04f5a53847c00665964bab72fc275364420fd592


    return {
      statusCode: 200,
      headers : {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify({
<<<<<<< HEAD
<<<<<<< Updated upstream
        update
=======
        "item":toDoItem
<<<<<<< Updated upstream
>>>>>>> 04f5a53847c00665964bab72fc275364420fd592
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
<<<<<<< HEAD
  )
=======
        "item":toDoItem
      }),
    };
  };
>>>>>>> Stashed changes
=======
  )
>>>>>>> 04f5a53847c00665964bab72fc275364420fd592
=======
      }),
    };
  };
>>>>>>> Stashed changes
