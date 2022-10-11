import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { cors, httpErrorHandler} from 'middy/middlewares'
import * as middy from 'middy'
import { createAttachmentPresignedUrl } from '../../businessLogic/todos'
import { getUserId } from '../utils'


export const handler = middy(
async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> =>{
  
    // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
    console.log("Processing Event ", event);
    const todoId = event.pathParameters.todoid;
    const userId = getUserId(event)
    const URL = await createAttachmentPresignedUrl(userId,todoId);
     
    return{
      statusCode: 202,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify({
         URL
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

