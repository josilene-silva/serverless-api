import { APIGatewayProxyHandler } from 'aws-lambda';
import { document } from '../database/dynamodbClient';
import { v4 as uuidV4 } from 'uuid';

interface ICreateUser {
    name: string;
    email: string;
}

export const handler: APIGatewayProxyHandler = async (event) => {
    const { name, email } = JSON.parse(event.body) as ICreateUser;

    const userEmail = await document.scan({
        TableName: 'users',
        FilterExpression: 'email = :email',
        ExpressionAttributeValues: {
            ':email': email
        },
    }).promise();

    if (userEmail.Items[0]) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: 'E-mail already registered',
            })
        }
    }

    const id = uuidV4();

    await document.put({
        TableName: 'users',
        Item: {
            id,
            name,
            email,
            created_at: new Date().getTime(),
        }
    }).promise();

    const response = await document.query({
        TableName: 'users',
        KeyConditionExpression: 'id = :id',
        ExpressionAttributeValues: {
            ':id': id,
        }
    }).promise();

    const user = response.Items[0];

    return {
        statusCode: 201,
        body: JSON.stringify(user)
    }
}