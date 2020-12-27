#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Step04AppsyncLambdaDynamodbStack } from '../lib/step-04-appsync-lambda-dynamodb-stack';

const app = new cdk.App();
new Step04AppsyncLambdaDynamodbStack(app, 'Step04AppsyncLambdaDynamodbStack');
