/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context) => {
  console.warn("We've got lambda");
  console.warn(event);
  return event;
};
