import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { cors, httpErrorHandler} from 'middy/middlewares'
import * as middy from 'middy'
import { createAttachmentPresignedUrl } from '../../businessLogic/todos'
//import { getUserId } from '../utils'


export const handler = middy(
async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> =>{
  
    // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
    console.log("Processing Event",event);
    const todoId = event.pathParameters.todoId;
    const URL = await createAttachmentPresignedUrl(todoId); 
    return{
      statusCode: 202,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
         uploadURL:URL,
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

