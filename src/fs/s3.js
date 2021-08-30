const aws = require("aws-sdk");

aws.config.region = process.env.AWS_S3_BUCKET_REGION;
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});


function uploadObject(fileName, file){
  const s3 = new aws.S3();

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileName,
    Body:file,
  }
  s3.upload(params, function(err, data) {
    if(err){
      console.error(err);
      return;
    } 
    return(data);
  });
  
}

module.exports = {
  uploadObject
}