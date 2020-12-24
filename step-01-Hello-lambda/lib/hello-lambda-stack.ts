import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigateway';

export class HelloLambdaStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const hello = new lambda.Function(this, "HelloHandler", {
      runtime: lambda.Runtime.NODEJS_10_X,
      code: lambda.Code.fromAsset("lambda"),
      handler: "hello.handler",
    });
    // new apigw.LambdaRestApi(this, "Endpoint", {
    //   handler: hello,
    // });
        
    //api with GET method
    const api = new apigw.LambdaRestApi(this, "Endpoint_One" , {
      handler: hello,
      proxy: false
    });
    //here we define methods on api 
    const items = api.root.addResource('cars');
    items.addMethod("GET");

    //Could we one or more create api call on same function?yes we could
    const api2 = new apigw.LambdaRestApi(this , "Endpoint_Two",{
      handler: hello,
      proxy: false
    });
    const items_2 = api2.root.addResource('Aeroplanes');
    const items_3 = api2.root.addResource('Trucks');
    items_2.addMethod('GET');
    items_3.addMethod('GET');
  }
}
