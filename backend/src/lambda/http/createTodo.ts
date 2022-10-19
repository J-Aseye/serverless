import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
//import * as middy from 'middy'
//import { cors } from 'middy/middlewares'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { getUserId } from '../utils';
import { createTodo } from '../../businessLogic/todos'
import { createLogger } from '../../utils/logger'

const logger = createLogger('createTodo')

export const handler = 
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
<<<<<<< HEAD
<<<<<<< Updated upstream
    const authorization = event.headers.Authorization;
    const split = authorization.split('');
    const jwtToken = split[1];

=======
>>>>>>> 04f5a53847c00665964bab72fc275364420fd592
    const newTodo: CreateTodoRequest = JSON.parse(event.body)
    // TODO: Implement creating a new TODO item
    const userId = getUserId(event)

<<<<<<< HEAD
=======

    console.log("Processing Event", event)
    const userId = getUserId(event)
    const newTodo: CreateTodoRequest = JSON.parse(event.body);
  
    // TODO: Implement creating a new TODO item
    const toDoItem = await createTodo(newTodo, userId)

    logger.info(`Todo item created;
    id: ${toDoItem.todoId}`)
    
>>>>>>> Stashed changes
=======
    const item = await createTodo(newTodo, userId)
    logger.info(`Todo item created;
    id: ${item.todoId}`)
>>>>>>> 04f5a53847c00665964bab72fc275364420fd592
    return {
      statusCode: 201,
      headers : {
        "Access-Control-Allow-Origin": "*"
      },
<<<<<<< HEAD
<<<<<<< Updated upstream
      body: JSON.stringify({
        "item": toDoItem
      })
=======
      body: JSON.stringify( { item} )
>>>>>>> 04f5a53847c00665964bab72fc275364420fd592
    }
  }
)
=======
      body: JSON.stringify( {
         "item":toDoItem
        } ),
    }
  };

>>>>>>> Stashed changes

