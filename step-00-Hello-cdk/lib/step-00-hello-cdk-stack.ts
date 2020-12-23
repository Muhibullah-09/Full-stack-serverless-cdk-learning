import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';

export class Step00HelloCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    //Here we use simple s3(simple storage service).In s3 bucket we
    //We can store static files, images etc.
    //Any service must require three arguments. 1.A scope 2.A name or ID 3.Properties 
    new s3.Bucket(this, "MyFirstPractice Bucket" , {
      versioned:true
    });
  }
};