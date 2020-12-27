#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Step03AppsyncLambdaAsDatasourceStack } from '../lib/step-03-appsync-lambda-as-datasource-stack';

const app = new cdk.App();
new Step03AppsyncLambdaAsDatasourceStack(app, 'Step03AppsyncLambdaAsDatasourceStack');
