import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";
const TokenValidator = require('twilio-flex-token-validator').validator;

export async function main(event, context) {

    //console.log('Request Headers:', event.headers);
    //console.log('Request Jwe:', event.headers['X-Flex-JWE']);
    //console.log('Request Body:', event.body);

    try {
        const token = event.headers['X-Flex-JWE'];
        const tokenResult = await TokenValidator(token, process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
        console.log("validated token", tokenResult);

        const params = {
            TableName: process.env.tableName,
            Limit: 50
        };
        const result = await dynamoDbLib.call("scan", params);
        result.Items.forEach(function(plugin) {
            //To avoid S3 cache 
            plugin.src = plugin.src + "?date=" + new Date().getTime();
        });
        return success(result.Items);

    } catch (err) {
        console.log(err);
        return failure(err);
    }
}