# phone-home

This serverless application provides a phone home endpoint for recording contacts from another deployed application.

It provides a demo integration of [API Gateway](https://aws.amazon.com/api-gateway/) + [AWS Lambda](https://aws.amazon.com/lambda) + [Node.js](https://nodejs.org/) + [Amazon DynamoDB](https://aws.amazon.com/dynamodb/)

## Deploy with CloudFormation

Prerequisites: [Node.js](https://nodejs.org/en/) and [AWS CLI](http://docs.aws.amazon.com/cli/latest/userguide/installing.html) installed

* Create an [AWS](https://aws.amazon.com/) Account and [IAM User](https://aws.amazon.com/iam/) with the `AdministratorAccess` AWS [Managed Policy](http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html)
* Run `aws configure` to put store that user's credentials in `~/.aws/credentials`
* Create an S3 bucket for storing the Lambda code and store its name in a shell variable with:
  * `export S3_BUCKET=<bucket name>`
* Npm install:
  * `npm install`
* Build:
  * `npm run build`
* Upload package to S3, transform the CloudFormation template:
  * `npm run package`
* Deploy to CloudFormation:
  * `npm run deploy`

## Deploy from the AWS Serverless Application Repository
* Hit "Deploy" from the [application](https://serverlessrepo.aws.amazon.com/#/applications/arn:aws:serverlessrepo:us-east-1:233054207705:applications~phone-home) page

## Usage
### Find Invocation URL
* In the [API Gateway Console](https://console.aws.amazon.com/apigateway), navigate to APIs / your API / Dashboard
* Find the Invocation url, something like *https://xxxxxxxxx.execute-api.region.amazonaws.com/Prod/*
  * (Alternately, you can set up a [custom domain name](http://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-custom-domains.html))

### Command line
Post data:
```
curl -d '{"username":"you", "host":"localhost"}' https://xxxxxxxxx.execute-api.region.amazonaws.com/Prod/
```

Get data:
```
curl https://xxxxxxxxx.execute-api.region.amazonaws.com/
```

### JavaScript
Post data for logged in user (Take care to comply with any applicable [Do Not Track legislation](https://en.wikipedia.org/wiki/Do_Not_Track_legislation)):

```
// Phone home if we're not on localhost
function phoneHome(username) {
  if (!window.location.host.includes('localhost')) {
    fetch('https://xxxxxxxxx.execute-api.region.amazonaws.com/',
      {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          host: window.location.host
        })
      });
  }
}
```

## Links
* [phone-home](https://github.com/evanchiu/phone-home) on Github
* [phone-home](https://serverlessrepo.aws.amazon.com/#/applications/arn:aws:serverlessrepo:us-east-1:233054207705:applications~phone-home) on the AWS Serverless Application Repository

## License
&copy; 2017 [Evan Chiu](https://evanchiu.com). This project is available under the terms of the MIT license.
