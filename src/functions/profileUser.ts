import { APIGatewayProxyHandler } from 'aws-lambda';
import { document } from '../database/dynamodbClient';

export const handler: APIGatewayProxyHandler = async (event) => {
    const { id } = event.pathParameters;

    const userEmail = await document.scan({
        TableName: 'users',
        FilterExpression: 'id = :id',
        ExpressionAttributeValues: {
            ':id': id
        },
    }).promise();

    const user = userEmail.Items[0];

    if (!user) {
        return {
            statusCode: 404,
            body: JSON.stringify({
                message: 'User not found',
            })
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify(user)
    }
}