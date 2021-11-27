
import * as cdk from '@aws-cdk/core';
import * as apigateway from '@aws-cdk/aws-apigateway'
import * as lambda from '@aws-cdk/aws-lambda'
import * as path from 'path'

export class LambdaExamplesStack extends cdk.Stack {
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
    const mylambda = new lambda.Function(this, "MyLambda", {
      runtime: lambda.Runtime.GO_1_X,
      handler: "main",
      code: lambda.Code.fromAsset(path.resolve("..", "function", "main.zip"))
    })

    return mylambda
  }
}
