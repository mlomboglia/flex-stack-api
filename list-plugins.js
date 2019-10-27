
export function main(event, context, callback) {

  let plugins = [{
    "name": "Flex Starter Plugin",
    "version": "1.0.0",
    "src": "https://flex-plugin-starter.s3.eu-west-2.amazonaws.com/dist/master/plugin-starter.js"
  }];

  callback(null, plugins);
};
