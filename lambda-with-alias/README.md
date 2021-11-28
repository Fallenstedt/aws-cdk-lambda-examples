**What is this?**

This example creates a `LambdaDeploymentGroup` for a lambda function. Each blue green deployment monitors the candidate lambda for errors. If an error occurs within 5 minutes of deployment, the lambda is rolled back and an email is sent to the user.

Learn more about [Deployment Groups with CodeDeploy here](https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-groups.html)

**Instructions**

Change `YOUR_EMAIL_HERE` in `deploy-lambda-with-alias.sh` to deploy this and try it out. 

Then run `./deploy-lambda-with-alias.sh` in the parent directory

**Useful commands**

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
