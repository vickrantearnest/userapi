const bcrypt = require('bcrypt');
const saltRounds = 10;
require('dotenv').config();
let AWS = require("aws-sdk");
AWS.config.update({
   accessKeyId: process.env.AWS_KEY,
   secretAccessKey: process.env.AWS_SECRET,
   region: process.env.AWS_REGION,
   endpoint: process.env.AWS_ENDPOINT
});
let dynamodb = new AWS.DynamoDB();
// let params = {
//   ExclusiveStartTableName: "stringvalue",
//   Limit: 10
// }
const usertable = process.env.USERTABLE;
const logintable = process.env.USERLOGINSLOGTABLE
// dynamodb.listTables({Limit: 10}, function(err, data) {
//    if (err) {
//      console.log("Error", err.code);
//    } else {
//      console.log("Table names are ", data.TableNames);
//    }
//  });
// let pass = bcrypt.hashSync('vimal@123', saltRounds);
//  var params = {
//    TableName : usertable,
//    Item: {'username' : {S: 'vickrant.earnest@gmail.com'}, 'password' : {S: pass}, 'status' : {N: '1'}, 'mobile': {S:'9860132098'}, 'location' : {S:'Mumbai'}
//    }
// };
let params = {
   TableName : logintable,
   Item: {'username' : {S: 'vickrant.earnest@gmail.com'}, 'timestamp': { N: '1572950293' }
   }
};


// dynamodb.putItem(params, function(err, data) {
// if (err) {
//    console.log("Error", err);
// } else {
//    console.log("Success", data);
// }
// });
// var params = {
//    TableName : usertable,
//    Item: {'username' : {S: 'vickrant.earnest@gmail.com'}, 'password' : {S: 'vimal@123'}, 'status' : {N: '1'}
//    }
// };
 

dynamodb.putItem(params, function(err, data) {
if (err) {
   console.log("Error", err);
} else {
   console.log("Success", data);
}
});
// try{
//    var createLogins = function(callback) {
//       var params = {
//          TableName : usertable,
//          KeySchema: [       
//             { AttributeName: "username", KeyType: "HASH"},
            
//             ],
//          AttributeDefinitions: [       
//             { AttributeName: "username", AttributeType: "S" },
//             ],
//          ProvisionedThroughput: {       
//             ReadCapacityUnits: 5, 
//             WriteCapacityUnits: 5
//             }
//          };
//          dynamodb.createTable(params, function(err, data) {
//             if (err) {
//             console.log("Error", err);
//             } else {
//             console.log("Table Created = "+usertable, data);
//             }
//          });
//          // Add the four results for clubs
     
//    };
// }catch(error) {
//    console.log(error);
// }
// try{
//    createLogins();
// }catch(error){
//    console.log(error);
// }
// try{
//    // const createUsers = (callback) => { 
//    var createUsers = function(callback) {
//       var params = {
//          TableName : logintable,
//          KeySchema: [       
//             { AttributeName: "username", KeyType: "HASH"},
//             { AttributeName: "timestamp", KeyType: "RANGE"}
//             ],
//          AttributeDefinitions: [       
//             { AttributeName: "username", AttributeType: "S" },
//             { AttributeName: "timestamp", AttributeType: "N" }
//             ],
//          ProvisionedThroughput: {       
//             ReadCapacityUnits: 5, 
//             WriteCapacityUnits: 5
//             }
//          };
//          dynamodb.createTable(params, function(err, data) {
//             if (err) {
//             console.log("Error", err);
//             } else {
//             console.log("Table Created = "+logintable, data);
//             }
//          });
//    };
// }catch(error) {
//    console.log(error);
// }
// try{
//    createUsers();
// }catch(error){
//    console.log(error);
// }