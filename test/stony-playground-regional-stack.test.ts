import * as cdk from 'aws-cdk-lib';
import { StonyPlaygroundRegionalStack } from '../lib/stony-playground-regional-stack';
import { Template} from 'aws-cdk-lib/assertions';

test('Validate that all lambdas use node18', () => {
    const app = new cdk.App();
    const stack = new StonyPlaygroundRegionalStack(app, "StonyPlaygroundRegionalStack");
    const template = Template.fromStack(stack);
    template.hasResourceProperties('AWS::Lambda::Function', {
        Runtime: 'nodejs20.x'
    });
});