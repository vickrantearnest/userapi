var should = require('should'); 
var assert = require('assert');
var request = require('supertest'); 
var expect  = require('chai').expect;
const bcrypt = require('bcrypt');
const saltRounds = 10;
// var request = require('request');
const app = require('../server.js');

describe('Routing', function() {
    var url = 'http://localhost:3000';
    // within before() you can run all the operations that are needed to setup your tests. In this case
    // I want to create a connection with the database, and when I'm done, I call done().
    before(function(done) {
      // In our tests we use the test db
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
        let usertablecreated = false;
        let logintablecreated = false;
        dynamodb.listTables({Limit: 10}, function(err, data) {
            if (err) {
                console.log("Error", err.code);
            } else {
                console.log("Table names are ", data.TableNames);
                console.log(data.TableNames.indexOf(logintable));
                if(data.TableNames.indexOf(logintable) === -1){
                    try{
                        var params = {
                            TableName : logintable,
                            KeySchema: [       
                                { AttributeName: "username", KeyType: "HASH"},
                                { AttributeName: "timestamp", KeyType: "RANGE"}
                            ],
                            AttributeDefinitions: [       
                                { AttributeName: "username", AttributeType: "S" },
                                { AttributeName: "timestamp", AttributeType: "N" }
                            ],
                            ProvisionedThroughput: {       
                                ReadCapacityUnits: 5, 
                                WriteCapacityUnits: 5
                            }
                        };
                        dynamodb.createTable(params, function(err, data) {
                            if (err) {
                                console.log("Error", err);
                            } else {
                                console.log("Table Created = "+logintable, data);
                                done();
                            }
                        });
                        // Add the four results for clubs
                    }catch(error) {
                        console.log(error);
                    }
                }
                // if(data.TableNames[0] !=)
            }
            if(data.TableNames.indexOf(usertable) === -1){
                try{
                    var params = {
                        TableName : usertable,
                        KeySchema: [       
                            { AttributeName: "username", KeyType: "HASH"},
                        ],
                        AttributeDefinitions: [       
                            { AttributeName: "username", AttributeType: "S" },
                        ],
                            ProvisionedThroughput: {       
                            ReadCapacityUnits: 5, 
                            WriteCapacityUnits: 5
                        }
                    };
                    dynamodb.createTable(params, function(err, data) {
                    if (err) {
                        console.log("Error", err);
                    } else {
                        console.log("Table Created = "+usertable, data);
                        // let pass = bcrypt.hashSync('vimal@123', saltRounds);
                        bcrypt.hash('vimal@123', saltRounds, function(err, hash) {
                            let params = {
                                TableName : usertable,
                                Item: {'username' : {S: 'vickrant.earnest@gmail.com'}, 'password' : {S: hash}, 'status' : {N: '1'}, 'mobile': {S:'9860132098'}, 'location' : {S:'Mumbai'}
                                }
                            };
                            dynamodb.putItem(params, function(err, data) {
                                if (err) {
                                    console.log("Error", err);
                                } else {
                                    console.log("Success", data);
                                    done();
                                }
                            });
                        });
                        
                    }
                    });
                }catch(error) {
                    console.log(error);
                }
            }
        });						
        done();
    });
    describe('POST /users/authenticate', function() {
        it('responds with json', function(done) {
            request(url)
                .post('/users/authenticate')
                .send({})
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(401)
                .end(function(err, res) {
                if (err) return done(err);
                done();
                });
        });
    });
    describe('POST /users/authenticate', function() {
        it('responds with json', function(done) {
            var userdata = {
                username: 'vickrant.earnest@gmail.com ',
                pass: 'vimal@123'
              };
            request(app)
                .post('/users/authenticate')
                .send('username', 'vickrant.earnest@gmail.com')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                if (err) return done(err);
                done();
                });
        });
    });
});