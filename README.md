**What is this?**

This is a repo that contains two ways to deploy lambda functions using AWS CDK. 

* `just-lambda` just deploys a lambda with an API Gateway infront of it. Deploy it with `./deploy-just-lambda.sh`

* `lambda-with-alias` does a blue/green deployment with each lambda release. If there is an error within 5 minutes of a deploy, then it is reverted. [Learn more about `Lambda Deployment Groups` here](https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-groups.html). Enter your email address in `./deploy-lambda-with-alias.sh` and run it


