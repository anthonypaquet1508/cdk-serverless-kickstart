
import middy from "@middy/core";
import { captureLambdaHandler } from "@aws-lambda-powertools/tracer";
import { logger, metrics, tracer } from "../powertools/utilities";
import { injectLambdaContext } from "@aws-lambda-powertools/logger";
import { logMetrics, MetricUnits } from "@aws-lambda-powertools/metrics";

const lambdaHandler = async (event: any): Promise<any> => {

    logger.appendKeys({
        event: event
    });

    metrics.addMetric('helloWorld', MetricUnits.Count, 1);

    return {
        body: JSON.stringify({ message: "Product not found" }),
    };
};

const handler = middy(lambdaHandler)
    .use(captureLambdaHandler(tracer))
    .use(logMetrics(metrics, { captureColdStartMetric: true }))
    .use(injectLambdaContext(logger, { clearState: true }));

export {
    handler
};