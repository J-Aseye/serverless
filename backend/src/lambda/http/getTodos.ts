import 'source-map-support/register'
//import { getUserId } from '../utils'
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { getTodosForUser as getTodosForUser } from '../../businessLogic/todos';


// TODO: Get all TODO items for a current user
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log("Processing Event", event);
  // Write your code here
  //const userId = getUserId(event)
    const authorization = event.headers.Authorization;
    const split = authorization.split('');
    const jwtToken = split[1];

  const items = await getTodosForUser(jwtToken);

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
