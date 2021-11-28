
import * as cdk from '@aws-cdk/core';
import * as apigateway from '@aws-cdk/aws-apigateway'
import * as lambda from '@aws-cdk/aws-lambda'
import * as cd from "@aws-cdk/aws-codedeploy";
import * as cw from "@aws-cdk/aws-cloudwatch";
import * as cwactions from "@aws-cdk/aws-cloudwatch-actions"
import * as sns from "@aws-cdk/aws-sns"
import * as subscriptions from "@aws-cdk/aws-sns-subscriptions"
import * as path from 'path'

export class LambdaWithCodeDeployStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.buildApi(this.lambda())
  
  }

  private buildApi(fn: lambda.Function) {
    const api = new apigateway.RestApi(this, 'SimpleLambdaAPI', {
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS
      }
    })

    api.root.addMethod("GET", new apigateway.LambdaIntegration(fn), {operationName: "test-lambda"})
  }

  private lambda(): lambda.Function {
    // Create a Lambda Function
    const lambdaName = "MyLambda2"
    const mylambda = new lambda.Function(this, lambdaName, {
      runtime: lambda.Runtime.GO_1_X,
      handler: "main",
      code: lambda.Code.fromAsset(path.resolve("..", "function", "main.zip"))
    })

    // Create a Lambda Alias
    const lambdaAliasName = lambdaName+"Alias"
    const aliasLambda = new lambda.Alias(this, lambdaAliasName, {
      aliasName: lambdaAliasName,
      version: mylambda.currentVersion
    })

    // Create an SNS Topic that publishes to an email address
    const topic = new sns.Topic(this, 'MyLambdaFailureSNSTopic', {
      displayName: 'My Lambda CloudWatch Alarm Topic',
    });
    const emailAddress = new cdk.CfnParameter(this, 'snsEmail', {
      type: "String",
      description: "The email to send failed deploy alerts to"
    });
    topic.addSubscription(new subscriptions.EmailSubscription(emailAddress.valueAsString))
    
    // https://bobbyhadz.com/blog/cloudwatch-alarm-aws-cdk
    const lambdaErrors = mylambda.metricErrors({
      period: cdk.Duration.minutes(1),
      statistic: "sum",
      dimensionsMap: {
        FunctionName: mylambda.functionName
      }
    })
    const lambdaAlarm = lambdaErrors.createAlarm(this, "LambdaFailureAlarm", {
      alarmDescription: "The latest deployment errors are greater than zero",
      threshold: 1,
      evaluationPeriods: 1,
    })
    lambdaAlarm.addAlarmAction(new cwactions.SnsAction(topic))

    new cd.LambdaDeploymentGroup(this, "MyLambdaDeploymentGroup", {
      alias: aliasLambda,
      deploymentConfig: cd.LambdaDeploymentConfig.CANARY_10PERCENT_5MINUTES,
      alarms: [lambdaAlarm]
    })

    return mylambda
  }
}
