const axios = require('axios');

const url = 'https://graph.facebook.com/v19.0/XXXXXXXXXXXX/messages';
const token = '<token>';

const config = {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
};

module.exports.handler = async(event)=>{
  console.log(event);
  try{
    const OldImage = event.Records[0].dynamodb.OldImage;
    const data = {
      messaging_product: 'whatsapp',
      to: decodeURIComponent(OldImage.phone_number.S),
      type: 'template',
      template: {
        name: 'discount_template',
        language: {
          code: 'en_US'
        }
      }
    };
    const res = await axios.post(url, data, config);
    console.log(JSON.stringify(res.data));
  }
  catch(e){
    console.error('Error:', e);
  }
}
