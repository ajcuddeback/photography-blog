require('dotenv').config();
const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');

// Enviornment Vars
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

// Create the bucket
const s3bucket = new S3({
    region,
    accessKeyId,
    secretAccessKey
});

function uploadFile(file) {
    // Create a file stream to save the file to s3
    const fileStream = fs.createReadStream(file.path);

    // Configuration params, setting ACL to public for public access on all photos
    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }

    // Return s3 upload promise
    return s3bucket.upload(uploadParams).promise();
}

module.exports = uploadFile