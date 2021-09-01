import {config } from 'aws-sdk';
import S3 = require('aws-sdk/clients/s3');
import { PutObjectRequest } from 'aws-sdk/clients/s3';

config.region = process.env.AWS_S3_BUCKET_REGION;
config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

class S3Client{

  uploadObject(fileName: string, file: any){
    const s3 = new S3();
    const bucketName: string = process.env.AWS_S3_BUCKET_NAME as string;
  
    const params : PutObjectRequest = {
      Bucket: bucketName,
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
}

export default S3Client;