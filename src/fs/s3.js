const aws = require("aws-sdk");

aws.config.region = process.env.AWS_S3_BUCKET_REGION;
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
