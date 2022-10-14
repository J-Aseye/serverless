import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { cors, httpErrorHandler} from 'middy/middlewares'
import * as middy from 'middy'
import { createAttachmentPresignedUrl } from '../../businessLogic/todos'
import { getUserId } from '../utils'


export const handler = middy(
async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> =>{
  
    // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
   
    const todoId = event.pathParameters.todoId;
    const userId = getUserId(event)
    const uploadURL = await createAttachmentPresignedUrl(userId,todoId);
     
    return{
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify({
         uploadURL
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

