import * as cdk from '@aws-cdk/core';
import * as appsync from '@aws-cdk/aws-appsync';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';

export class BackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //This is Appsync graphql Api for lambda function
    const Todo_API = new appsync.GraphqlApi(this, 'Api', {
      name: 'cdk-todos-appsync-api',
      schema: appsync.Schema.fromAsset('schema/schema.gql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
        },
      },
      xrayEnabled: true,
    });
    
    //This is lambda function
    const todosLambda = new lambda.Function(this, 'AppSyncNotesHandler', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('functions')
    });

    //Here we define our Datasource
    const lambdaDs = Todo_API.addLambdaDataSource('lambdaDatasource', todosLambda);

    //Here we define resolvers for queries and for mutations
    lambdaDs.createResolver({
      typeName: "Query",
      fieldName: "getTodos"
    });

    lambdaDs.createResolver({
      typeName: "Mutation",
      fieldName: "addTodo"
    });

    lambdaDs.createResolver({
      typeName: "Mutation",
      fieldName: "deleteTodo"
    });

    lambdaDs.createResolver({
      typeName: "Mutation",
      fieldName: "updateTodo"
    });

    //Here we define Dynamodb construct
    const todosTable = new dynamodb.Table(this, 'CDKTodosTable', {
      tableName: "Todos_Table",
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING,
      },
    });
    todosTable.grantFullAccess(todosLambda)
    todosLambda.addEnvironment('TODOS_TABLE', todosTable.tableName);

    // Prints out the AppSync GraphQL endpoint to the terminal
    new cdk.CfnOutput(this, "GraphQLAPIURL", {
      value: Todo_API.graphqlUrl
    });

    // Prints out the AppSync GraphQL API key to the terminal
    new cdk.CfnOutput(this, "GraphQLAPIKey", {
      value: Todo_API.apiKey || ''
    });

    // Prints out the stack region to the terminal
    new cdk.CfnOutput(this, "Stack Region", {
      value: this.region
    });
  }
}