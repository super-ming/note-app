export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "us-east-1",
    BUCKET: "mingho-serverless-note"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://g3m91t6pre.execute-api.us-east-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_TQG8H7F4S",
    APP_CLIENT_ID: "7jell5o49icbtevjfr3snqgksg",
    IDENTITY_POOL_ID: "us-east-1:ddc70af8-9b42-419c-aba0-b3d627a36b54"
  }
};
