# My Drop-Drive Project.
🐱‍🚀 Welcome !!

Drop-Drive is a tool to backup your files in your personal cloud.

## Project Goal
The Main goal of this project is to have a tool that helps to add or drop files into your personal cloud and practice some Node.js and AWS concepts.

## Features - backlog.
+ Define a CLI client which will receive a list of files or folder to upload to the specified cloud - v.1.0.0.
+ Define a work space or main folder, which will could be specified in properties. Daemon client - _future feature_.
+ GUI - _future feature_.
+ Support for different cloud vendors - _future feature_.

### CLI Specification.
[WIP] - The cli client uses [yargs](https://www.npmjs.com/package/yargs) as a dependency to handle the arguments.


## Project Setup.
### Pre requisites.
* Git - [Download and install git](https://git-scm.com/downloads)
* Node.js - [Download and install Node](https://nodejs.org/en/download/)
* AWS account - [Create and/or login in your AWS account](https://console.aws.amazon.com/console/home)

### Download dependencies 
Install the project and download dependencies executing:
```
npm install
```

### Parameter configuration
The project contains the _env_example_ file, this file contains the parameters required for the app to run.
Create the _.env_ file based on the _.env_example_ file and add the proper values.

### AWS configuration.

#### Bucket cofiguration.
In your AWS account, create a S3 bucket with the same name and same region as defined in the _.env_ file.

#### Security configuration.
Following the least privilege strategy. Create a user and assign a permissions policy with just access to S3.

Generate the access key and secret key and aad them to the _.env_ file.

