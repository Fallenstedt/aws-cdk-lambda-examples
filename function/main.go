package main

import (
	"context"
	"fmt"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)


func handleLambdaEvent (ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	name := request.QueryStringParameters["name"]

	if name == "" {
		return response(400, "Bad Request"), nil
	}
	
	return response(200, fmt.Sprintf("Hello %v", name)), nil
}

func response(statusCode int, body string) (events.APIGatewayProxyResponse) {
	return events.APIGatewayProxyResponse{
		StatusCode: statusCode,
		Headers: map[string]string {
			"Access-Control-Allow-Origin": "*",
			"Content-Type": "text/plain",
		},
		Body: body,
	}
}

func main() {
	lambda.Start(handleLambdaEvent)
}