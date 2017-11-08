const aws = require('aws-sdk');
const doc = new aws.DynamoDB.DocumentClient();

exports.handler = main;

function main(event, context, callback) {
  if (event.httpMethod == 'GET') {
    return getAddresses(event, callback);
  } else if (event.httpMethod == 'POST' && event.body) {
    return saveEvent(event, callback);
  } else {
    return done(400, JSON.stringify({error: 'Missing or invalid HTTP Method'}), 'application/json', callback);
  }
}

function getAddresses(event, callback) {
  const params = {
    TableName: process.env.EVENT_TABLE
  };

  doc.scan(params, (err, data) => {
    if (err) {
      console.error('Dynamo error on load: ', err);
      return internalServerError(callback);
    } else {
      if (data && data.Items && Array.isArray(data.Items)) {

        // We have item data, transform it and return
        let addresses = data.Items.map((item) => { return item.id; });
        addresses.sort();
        return done(200, addresses.join('\n'), 'text/plain', callback);

      } else if (data && !data.Items) {
        // No data from the database, return success with no events
        return done(200, JSON.stringify([]), 'application/json', callback);

      } else {
        console.error('Bad/incomplete data from dyanamo: ', data);
        return internalServerError(callback);
      }
    }
  });
}

// Save phone home event to the database
function saveEvent(event, callback) {
  const json = JSON.parse(event.body);
  const address = json.username + '@' + json.host;
  const params = {
    TableName: process.env.EVENT_TABLE,
    Item: {
      id: address,
      username: json.username,
      host: json.host,
      timestamp: Date.now()
    }
  };

  doc.put(params, (err, data) => {
    if (err) {
      console.error('Dynamo error on save: ', err);
      return internalServerError(callback);
    } else {
      return done(200, JSON.stringify({message: 'Success'}), 'application/json', callback);
    }
  });
}

// Respond with a 500, internal server error
function internalServerError(callback) {
  return done(500, JSON.stringify({error: 'Internal Server Error'}), 'application/json', callback);
}

// We're done with this lambda, return to the client with given parameters
function done(statusCode, body, contentType, callback) {
  callback(null, {
    statusCode: statusCode,
    body: body,
    headers: {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    }
  });
}
