require('dotenv').config();
const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3bucket = new S3({
    region,
    accessKeyId,
    secretAccessKey
});

function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename,
        ContentType: file.mimetype, 
        ACL: "public-read"
    }

    return s3bucket.upload(uploadParams).promise();
}

module.exports = uploadFile