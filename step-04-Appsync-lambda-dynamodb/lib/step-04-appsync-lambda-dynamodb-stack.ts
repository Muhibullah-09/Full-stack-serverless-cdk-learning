import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as appsync from '@aws-cdk/aws-appsync';
import * as Dynamodb from '@aws-cdk/aws-dynamodb';


export class Step04AppsyncLambdaDynamodbStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new appsync.GraphqlApi(this, "GRAPHQL_API", {
      name: 'cdk-appsync-api',
      schema: appsync.Schema.fromAsset('graphql/schema.gql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
        },
      },
      xrayEnabled: true                                             ///Enables xray debugging
    });

    ///Lambda Fucntion
    const lambda_function_with_dynamoDB = new lambda.Function(this, "LambdaFucntionForDynamoDB", {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset("lambda"),
      handler: 'index.handler',
    });

    //Create datasource
    const DynamoDB_data_source = api.addLambdaDataSource("DynamoDB_as_Data_Source", lambda_function_with_dynamoDB);
    ///Describing resolver for datasource
    DynamoDB_data_source.createResolver({
      typeName: "Query",
      fieldName: "welcome"
    });
    DynamoDB_data_source.createResolver({
      typeName: "Mutation",
      fieldName: "addUser"
    });
    DynamoDB_data_source.createResolver({
      typeName: "Mutation",
      fieldName: "deleteUser"
    });

    // lib/file.ts
    const UsersTable = new Dynamodb.Table(this, 'CDKUserTable', {
      tableName: "UserTable",
      partitionKey: {
        name: 'id',
        type: Dynamodb.AttributeType.STRING,
      },
    });

    // enable the Lambda function to access the DynamoDB table (using IAM)
    UsersTable.grantFullAccess(lambda_function_with_dynamoDB)

    //Here we define enviroment variable for lambda function
    lambda_function_with_dynamoDB.addEnvironment("TABLE_NAME", UsersTable.tableName);
  }
}