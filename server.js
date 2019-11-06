const express = require('express');
const logger = require('morgan');
const userroutes = require('./app/routes/routes');
const userdata = require('./app/routes/userdata');
const bodyParser = require('body-parser');
const logreqres = require('./app/api/common/logreqres');
var jwt = require('jsonwebtoken');
const app = express();
require('dotenv').config();

app.set('secretKey', process.env.SECRET_KEY); // jwt secret token
// app.use(logger('dev'));
// app.use(logger('combined'))
app.use(logreqres);
app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
app.get('/' , (req, res) => {
  res.status(404).json({message: "Not found"});
});
// public route
app.use('/users', userroutes);
// private route
app.use('/userdata', validateUser, userdata);

// validateUser = (req, res, next) => {
function validateUser(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
    if (err) {
      res.status(401).json({status:"error", message: err.message, data:null});
    }else{
      // add user name to request
      // console.log(decoded);
      if(decoded.username !== ''){
        req.body.usernamedecoded = decoded.username;
      }else{
        res.status(401).json({status:"error", message: 'Invalid Token', data:null});
      }
      next();
    }
  });
}
// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function(req, res, next) {
 let err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// handle errors
app.use(function(err, req, res, next) {
 console.log(err);
 
  if(err.status === 404)
   res.status(404).json({message: "Not found"});
  else 
    res.status(500).json({message: "Something looks wrong :( !!!"});
});
app.listen(3000, function(){
 console.log('Node server listening on port 3000');
});