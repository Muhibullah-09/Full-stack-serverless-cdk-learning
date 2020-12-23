#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Step00HelloCdkStack } from '../lib/step-00-hello-cdk-stack';

const app = new cdk.App();
new Step00HelloCdkStack(app, 'Step00HelloCdkStack');
