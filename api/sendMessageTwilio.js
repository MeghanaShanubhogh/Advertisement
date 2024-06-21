const accountSid = '<Sid>';
const authToken = '<token>';
const client = require('twilio')(accountSid, authToken);

module.exports.handler = async(event)=>{
    try{
        const OldImage = event.Records[0].dynamodb.OldImage;
        console.log(OldImage);
        const res = await client.messages
    .create({
        body: OldImage.message.S,
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:'+OldImage.phone_number.S
    });
    console.log(res);
    }
    catch(e){
        console.log(e);
    }
}