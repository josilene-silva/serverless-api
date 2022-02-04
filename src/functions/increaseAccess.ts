import { APIGatewayProxyHandler } from 'aws-lambda';
import countapi from 'countapi-js';

const NAMESPACE = process.env.COUNTAPI_NAMESPACE;
const KEY = process.env.COUNTAPI_KEY;
const VALUE_TO_INCREMENT = 1;

export const handler: APIGatewayProxyHandler = async (event) => {
    try {
        await countapi.update(NAMESPACE, KEY, VALUE_TO_INCREMENT);

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Increased access'
            })
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Error increase access',
                error: error
            })
        }
    }
}