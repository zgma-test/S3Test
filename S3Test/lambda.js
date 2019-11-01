let AWS = require('aws-sdk');
const rekognition = new AWS.Rekognition({ apiVersion: '2016-06-27' });

exports.handler = function (event, context, callback) {

    console.log(event);
    let s3Obj = event.Records[0].s3;

    let params = {
        Image: {
            S3Object: {
                Bucket: s3Obj.bucket.name,
                Name: s3Obj.object.key
            }
        },
        MaxLabels: 10
    };
    rekognition.detectLabels(params).promise()
        .then(data => {
            console.log(data);
            callback(null, data);
        })
        .catch(err => {
            console.log(err);
            callback(err);
        });

    
}