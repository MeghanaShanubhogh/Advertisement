const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const dynamoDB = require('aws-sdk/clients/dynamodb');
const documentCLient = new dynamoDB.DocumentClient( {region:"us-west-2"});
const moment = require('moment');
const { v4 : uuidv4} = require('uuid');

module.exports.handler = async (event) => {
    console.log('S3 event:', JSON.stringify(event, null, 2));
    const bucketName = event.Records[0].s3.bucket.name;
    const objectKey = event.Records[0].s3.object.key;
    const fileContent = await fetchfileContent(bucketName,objectKey);
    await batchWriteAdsTable(fileContent);
    console.log('Done Adding');
};

async function fetchfileContent(bucketName, objectKey) {
    try {
        const params = {
            Bucket: bucketName,
            Key: objectKey
        };
        const data = await s3.getObject(params).promise();
        const fileContent = data.Body.toString('utf-8');
        return fileContent;
    } catch (error) {
        console.error('Error fetching file from S3:', error);
        return 'error';
    }
}

async function batchWriteAdsTable(fileContent) {
    try{
        let rows = fileContent.split('\n').map(row => row.split(','));
        rows = rows.filter(row=>row[2]=='1');
        const items = rows.map(row => {
            return {
                PutRequest: {
                    Item: {
                        message_id: uuidv4(),
                        expiry_date: 1715003700,
                        message: row[4],
                        phone_number: '<phone number>'
                    }
                }
            };
        });
        console.log(JSON.stringify(items));
        const paramsDynamoDB = {
            RequestItems: {
                "advertisement-dev": items
            }
        };

        let data = await documentCLient.batchWrite(paramsDynamoDB).promise();
        console.log(data);
    }
    catch(err)
    {
        console.log(err);
    }
}