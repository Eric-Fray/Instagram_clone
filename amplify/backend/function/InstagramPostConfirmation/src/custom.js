/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require('aws-sdk');
const doccClient = new AWS.DynamoDB.DocumentCliebt();

//TableName = 'User-whl3dmuxeffufmt6dcgokxq6my-staging'; Tablename-AppsyncID-environment
const env = process.env.ENV;
const AppsyncID = process.env.API_INSTAGRAM_GRAPHQLAPIIDOUTPUT;
TableName = 'User-${AppsyncID}-${env}';

const userExists = async id => {
  const params = {
    TableName,
    Key: id,
  };
  try {
    const response = await doccClient.get(params).promise();
    return !!response?.Item;
  } catch (e) {
    return false;
  }
};

const saveUser = async user => {
  const date = new Date();
  const dataStr = date.toISOString();
  const timestamp = date.getTime();
  const item = {
    ...user,
    __typename: 'User',
    createdAt: dateStr,
    updatedAt: dateStr,
    _lastChangedAt: timestamp,
    _version: 1,
  };
  const params = {
    TableName,
    Item,
  };
  try {
    await doccClient.put(params).promise();
  } catch (e) {
    console.log(e);
  }
};

exports.handler = async (event, context) => {
  console.warn("We've got lambda");

  if (!event?.request?.userAttributes) {
    console.warn('No user data');
    return;
  }

  const {sub, name, email} = event.request.userAttributes; // {sub, user, emaail}

  const newUser = {
    id: sub,
    name,
    email,
  };

  // check if user exists
  if (!userExists(newUser.id)) {
    // if not, save the user
    saveUser(newUser);
  }

  return event;
};
