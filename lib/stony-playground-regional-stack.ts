import {
  aws_lambda,
  aws_logs,
  aws_lambda_nodejs
} from "aws-cdk-lib";
import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from 'constructs';
import * as path from "path";

export class StonyPlaygroundRegionalStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const esBuildSettings = {
      minify: true
    }

    const envVariables = {
      AWS_ACCOUNT_ID: Stack.of(this).account,
      POWERTOOLS_SERVICE_NAME: 'stony-playground',
      POWERTOOLS_LOGGER_LOG_LEVEL: 'WARN',
      POWERTOOLS_LOGGER_SAMPLE_RATE: '0.01',
      POWERTOOLS_LOGGER_LOG_EVENT: 'true',
      POWERTOOLS_METRICS_NAMESPACE: 'Stony',
    };

    const functionSettings = {
      handler: "handler",
      runtime: aws_lambda.Runtime.NODEJS_20_X,
      environment: {
        ...envVariables
      },
      memorySize: 256,
      logRetention: aws_logs.RetentionDays.ONE_WEEK,
      tracing: aws_lambda.Tracing.ACTIVE,
      bundling: esBuildSettings
    }

    new aws_lambda_nodejs.NodejsFunction(
      this,
      "helloWorld",
      {
        awsSdkConnectionReuse: true,
        entry: path.join(__dirname, "../src/lambdas/hello-world.ts"),
        ...functionSettings
      }
    );

  }
}