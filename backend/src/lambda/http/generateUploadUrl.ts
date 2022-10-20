import 'source-map-support/register'
<<<<<<< Updated upstream
<<<<<<< HEAD
<<<<<<< Updated upstream
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { cors} from 'middy/middlewares'
=======
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { cors, httpErrorHandler} from 'middy/middlewares'
import * as middy from 'middy'
>>>>>>> 04f5a53847c00665964bab72fc275364420fd592
import { createAttachmentPresignedUrl } from '../../businessLogic/todos'
//import { getUserId } from '../utils'
=======
import { APIGatewayProxyHandler,APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
//import { cors, httpErrorHandler} from 'middy/middlewares'
//import * as middy from 'middy'
import { generateUploadUrl } from '../../businessLogic/todos'
import { getUserId } from '../utils'
>>>>>>> Stashed changes


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> =>{
  
    // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
<<<<<<< HEAD
    console.log("Processing Event ", event);
    const todoId = event.pathParameters.todoid;

    const URL = await createAttachmentPresignedUrl(todoId);
     
=======
import { APIGatewayProxyHandler,APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
//import { cors, httpErrorHandler} from 'middy/middlewares'
//import * as middy from 'middy'
import { generateUploadUrl } from '../../businessLogic/todos'
import { getUserId } from '../utils'


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> =>{
  
    // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
    console.log("Processing Event",event);
    const userId = getUserId(event)
    const todoId = event.pathParameters.todoId;
    const URL = await generateUploadUrl(userId,todoId); 
    
>>>>>>> Stashed changes
=======
    console.log("Processing Event",event);
    const userId = getUserId(event)
    const todoId = event.pathParameters.todoId;
<<<<<<< Updated upstream
    const URL = await createAttachmentPresignedUrl(todoId); 
>>>>>>> 04f5a53847c00665964bab72fc275364420fd592
=======
    const URL = await generateUploadUrl(userId,todoId); 
    
>>>>>>> Stashed changes
    return{
      statusCode: 202,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
         uploadURL:URL,
      })
<<<<<<< Updated upstream
<<<<<<< HEAD
    };
<<<<<<< Updated upstream

  };

    cors({
      credentials: true
    });
  
=======
  };
>>>>>>> Stashed changes
=======
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

>>>>>>> 04f5a53847c00665964bab72fc275364420fd592
=======
    };
  };
>>>>>>> Stashed changes
