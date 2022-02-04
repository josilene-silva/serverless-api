import { APIGatewayProxyHandler } from 'aws-lambda';
import countapi from 'countapi-js';

const NAMESPACE = process.env.COUNTAPI_NAMESPACE;
const KEY = process.env.COUNTAPI_KEY;

interface IConsult {
    status: number,
    path: string,
    value: number,
}

export const handler: APIGatewayProxyHandler = async (event) => {
    try {
        const { value }: IConsult = await countapi.get(NAMESPACE, KEY);

        return {
            statusCode: 200,
            body: JSON.stringify({
                access: value
            })
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Error on consult access',
                error: error
            })
        }
    }
}