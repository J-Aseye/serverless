import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { cors} from 'middy/middlewares'
import { createAttachmentPresignedUrl } from '../../businessLogic/todos'
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
//import { getUserId } from '../utils'


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
    // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
    console.log("Processing Event ", event);
    const todoId = event.pathParameters.todoid;

    const URL = await createAttachmentPresignedUrl(todoId);
     
    return{
      statusCode: 202,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        presignedUrl: URL,
      })
    };

  };

    cors({
      credentials: true
    });
  
