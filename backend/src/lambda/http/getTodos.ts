import 'source-map-support/register'
import { getUserId } from '../utils'
import { APIGatewayProxyHandler,APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
//import * as middy from 'middy'
//import { cors } from 'middy/middlewares'
<<<<<<< Updated upstream

<<<<<<< HEAD
<<<<<<< Updated upstream
import { getTodosForUser as getTodosForUser } from '../../helpers/todos'
=======
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { getTodosForUser as getTodosForUser } from '../../businessLogic/todos'
>>>>>>> 04f5a53847c00665964bab72fc275364420fd592
import { getUserId } from '../utils';
=======
import { getTodosForUser as getTodosForUser } from '../../businessLogic/todos'
//import { getUserId } from '../utils';
>>>>>>> Stashed changes
=======

import { getTodosForUser as getTodosForUser } from '../../businessLogic/todos'
//import { getUserId } from '../utils';
>>>>>>> Stashed changes

// TODO: Get all TODO items for a current user
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // Write your code here
    const userId = getUserId(event)
    const items = await getTodosForUser(userId);

    return {
      statusCode: 200,
      headers : {
        "Access-Control-Allow-Origin": "*"
      },
      body:JSON.stringify({
        items
    })
    }
  }
