const localFs = require('./fs/LocalDir');

const aws = require("aws-sdk");

aws.config.region = process.env.AWS_S3_BUCKET_REGION;
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const mainDirName = 'main-dir';

function main(){
    localFs.readLocalDir(mainDirName)
    .then(dir => {
        console.log('Directory has been read', dir);
        // const s3 = new AWS.S3({apiVersion: '2006-03-01'});
        // const uploadParams = {Bucket: process.argv[2], Key: '', Body: ''};

        // for (const dirent of dir){
        //     console.log(dirent.name);
        // }

    })
    .catch(err => {
        if(err.errno === -4058){
            console.log(`Directory: ${mainDirName} does not exist. 
            Creating directory ...`);
            localFs.createDir(mainDirName)
            .then(() => {
                console.log(`Directory has been created!`);
                main();
            })
            .catch(err => console.error('An Error has occured! ', err));
        } else {
            console.error('An Error has occured! ', err);
        }
    });
}

//Main entry point
main();
