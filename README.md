# phone-home

This serverless application provides a phone home endpoint for recording contacts from another deployed application.

It provides a demo integration of [API Gateway](https://aws.amazon.com/api-gateway/) + [AWS Lambda](https://aws.amazon.com/lambda) + [Node.js](https://nodejs.org/) + [Amazon DynamoDB](https://aws.amazon.com/dynamodb/)

## Setup
* Create an [AWS](https://aws.amazon.com/) Account and [IAM User](https://aws.amazon.com/iam/) with the `AdministratorAccess` AWS [Managed Policy](http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html)
* Run `aws configure` to put store that user's credentials in `~/.aws/credentials`
* Create an S3 bucket for storing the Lambda code and store its name in a shell variable with:
  * `export S3_BUCKET=<bucket name>`
* Npm install:
  * `npm install --only=dev`
* Build:
  * `npm run build`
* Upload package to S3, transform the CloudFormation template:
  * `npm run package`
* Deploy to CloudFormation:
  * `npm run deploy`
