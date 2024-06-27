AWS lambda project which uses AWS resources like S3, Lambda and dynamoDB streams
1) The ML model predicts the next purchase date and creates a cvs file with future purchase date
2) The csv file gets uploaded to S3 bucket which triggers lambda function which will in turn add csv details to dynamoDB
3) We use dynamoDB expiry date and streams to trigger events to another lambda function
4) these lambda function would finally triggers twilio and Meta API to send the messages through whatsapp
<img width="760" alt="Screenshot 2024-06-27 at 9 09 16 AM" src="https://github.com/MeghanaShanubhogh/Advertisement/assets/115886543/6db9b3d8-8116-48de-8452-4a49eee8ed2c">
