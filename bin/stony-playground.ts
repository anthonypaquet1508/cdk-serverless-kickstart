#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { StonyPlaygroundRegionalStack } from '../lib/stony-playground-regional-stack';
import { StonyPlaygroundGlobalStack } from '../lib/stony-playground-global-stack';
import { readConfigs } from './configsParser';

const app = new cdk.App();

const configs = readConfigs();

const globalConfigs = configs.filter(config => !config.region);
const regionalConfigs = configs.filter(config => config.region);

regionalConfigs.forEach((config) => {
  new StonyPlaygroundRegionalStack(app, `StonyPlaygroundRegionalStack-${config.env}-${config.region}`, {
    env: { account: config.accountId, region: config.region },
  });
})

globalConfigs.forEach((config) => {
  new StonyPlaygroundGlobalStack(app, `StonyPlaygroundGlobalStack-${config.env}`, {
    env: { account: config.accountId },
  });
})

app.synth();