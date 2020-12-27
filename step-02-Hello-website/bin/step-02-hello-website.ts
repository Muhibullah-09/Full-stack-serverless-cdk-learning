#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Step02HelloWebsiteStack } from '../lib/step-02-hello-website-stack';

const app = new cdk.App();
new Step02HelloWebsiteStack(app, 'Step02HelloWebsiteStack');
