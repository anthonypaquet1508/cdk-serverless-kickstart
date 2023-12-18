import * as cdk from 'aws-cdk-lib';
import { StonyPlaygroundRegionalStack } from '../lib/stony-playground-regional-stack';
import { Template} from 'aws-cdk-lib/assertions';

test('Validate that lambdas are there', () => {
    const app = new cdk.App();
    const stack = new StonyPlaygroundRegionalStack(app, "StonyPlaygroundRegionalStack");
    const template = Template.fromStack(stack);
    template.hasResource('AWS::Lambda::Function', {});
});