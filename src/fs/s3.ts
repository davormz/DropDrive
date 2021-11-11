import {config } from 'aws-sdk';
import S3 = require('aws-sdk/clients/s3');
import { PutObjectRequest } from 'aws-sdk/clients/s3';
import Logger from './../logger/Logger';

config.region = process.env.DROPD_AWS_S3_BUCKET_REGION;
config.update({
  accessKeyId: process.env.DROPD_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.DROPD_AWS_SECRET_ACCESS_KEY
});

class S3Client{
  constructor(){
    Logger.info(`S3 config: 
    Region: ${process.env.DROPD_AWS_S3_BUCKET_REGION}
    Bucket: ${process.env.DROPD_AWS_S3_BUCKET_NAME}
    `)
  }

  uploadObject(fileName: string, file: any){
    const s3 = new S3();
    const bucketName: string = process.env.DROPD_AWS_S3_BUCKET_NAME as string;
  
    const params : PutObjectRequest = {
      Bucket: bucketName,
      Key: fileName,
      Body:file,
    }
    s3.upload(params, function(err, data) {
      if(err){
        Logger.error(err.message);
        return;
      } 
      return(data);
    });
    
  }
}

export default S3Client;