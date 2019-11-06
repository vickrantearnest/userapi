const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

require('dotenv').config();
const usertable = process.env.USERTABLE;
const logintable = process.env.USERLOGINSLOGTABLE
let AWS = require("aws-sdk");
AWS.config.update({
      accessKeyId: process.env.AWS_KEY,
      secretAccessKey: process.env.AWS_SECRET,
      region: process.env.AWS_REGION,
      endpoint: process.env.AWS_ENDPOINT
});
let dynamodb = new AWS.DynamoDB();

module.exports = {
   create: function(req, res, next) {
      console.log("received request.");
   },
   userData: (req, res, next) => {
      if(!req.body.hasOwnProperty('username') || req.body.username == ''){
         let resp = {message: "username is copulsory!!!", data:{}};
            res.status(401).json(resp);
      }else{
         let documentClient = new AWS.DynamoDB.DocumentClient();
         if(req.body.usernamedecoded === req.body.username){
            var params = {
               TableName: usertable,
               Key:{
                     "username": req.body.username
               }
            };
            documentClient.get(params, (err, data) => {
               delete data.Item.password;
               let resp = {message: "User data!!!", data:{ userdata: data.Item }};
               res.status(200).json(resp);
            });
         }
      }
   },
   authenticate: (req, res, next) => {
      if(!req.body.hasOwnProperty('username')){
         let resp = {message: "username is copulsory!!!", data:{}};
            res.status(401).json(resp);
      }else{
         var params = {
            TableName: usertable,
            Key:{
                  "username": req.body.username
            }
         };
         // console.log(params);
         let documentClient = new AWS.DynamoDB.DocumentClient();
         documentClient.get(params, (err, data) => {
            console.log('user found');
            // console.log(data);
            if(Object.keys(data).length === 0){
               let resp = {message: "Auth Error!!!", data:{}};
               res.status(401).json(resp);//Sending 401 so that if someone trys to attack via bruteforce cannot infer usesname available.
            }else{
               let result = bcrypt.compareSync(req.body.pass, data.Item.password);
               if (!result) { //Password not matched
                  let resp = {message: "Auth Error!!!", data:{}}
                  res.status(401).json(resp);
               } else {
                  if (err) {
                     console.log("Error", err);
                  } else {
                     // console.log(data);
                     let timestamp = Math.round(new Date().getTime()/1000);
                     let params = {
                        TableName : logintable,
                        Item: {'username' : {S: data.Item.username}, 'timestamp' : {N: timestamp.toString()}
                        }
                     };
                     dynamodb.putItem(params, (err, data1) => {
                        if (err) {
                           console.log("Error", err);
                        } else {
                           const token = jwt.sign({username: data.Item.username}, req.app.get('secretKey'), { expiresIn: process.env.TOKEN_VALID_TIME });
                           let resp = {message: "Authentication successful!!!", data:{token:token}};
                           res.status(200).json(resp);
                        }
                     });
                  }
               }
            }
         });
      }
   },
}