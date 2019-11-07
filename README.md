# userapi
**Setting up Environment**
----
```
please create .env file at root folder with the required aws dynamodb credentials
AWS_KEY=<AWS_KEY>
AWS_SECRET=<AWS_SECRET>
AWS_REGION=<AWS_REGION>
AWS_ENDPOINT=<AWS_ENDPOINT>
USERTABLE=Users
USERLOGINSLOGTABLE=Logins
ENVIRONMENT=dev
SECRET_KEY=SecretKeyGeneralUserRestApi
TOKEN_VALID_TIME=5min

Start the server on localhost by using below command:
node server.js

After starting the server run the tests using below command:
npm test

In first iteration test may fail will be fixing it.

```
**Authenticate User**
----
  Returns json data with auth token.

* **URL**

  /users/authenticate

* **Method:**

  `POST`
  
* **Data Params**

    username: "vickrant.earnest@gmail.com"
    pass: "vimal@123"

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"message":"Authentication successful!!!","data":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InZpY2tyYW50LmVhcm5lc3RAZ21haWwuY29tIiwiaWF0IjoxNTczMDE4MTk1LCJleHAiOjE1NzMwMTg3OTV9.gimCCS2zBQPOtsEeRqMs4nmMNHbD6KVOYCZXM-ALt2c"}}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{"message":"Not found"}`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"message":"Auth Error!!!","data":{}}`

* **Sample Call:**
    `data = { username: 'vickrant.earnest@gmail.com', pass: 'vimal@123' }`
  ```javascript
    $.ajax({
      url: "/users/authenticate",
      data: data,
      dataType: "json",
      type : "POST",
      success : function(r) {
        console.log(r);
      }
    });

**Get User details**
----
  Returns json data about a single user.

* **URL**

  /userdata/userdetails

* **Method:**

  `POST`
  
* **Data Params**

    username: "vickrant.earnest@gmail.com"
    
* **Headers**
    Token received from previous request for authentication.

    x-access-token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InZpY2tyYW50LmVhcm5lc3RAZ21haWwuY29tIiwiaWF0IjoxNTczMDE4MTk1LCJleHAiOjE1NzMwMTg3OTV9.gimCCS2zBQPOtsEeRqMs4nmMNHbD6KVOYCZXM-ALt2c"
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"message":"User data!!!","data":{"userdata":{"location":"Mumbai","username":"vickrant.earnest@gmail.com","mobile":"9860132098","status":1}}}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{"message":"Not found"}`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"message":"Auth Error!!!","data":{}}`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"status":"error","message":"invalid token","data":null}`
  

* **Sample Call:**
    `data = { username: 'vickrant.earnest@gmail.com', pass: 'vimal@123' }`
  ```javascript
    $.ajax({
      url: "/users/userdetails",
      data: data,
      dataType: "json",
      type : "POST",
      success : function(r) {
        console.log(r);
      }
    });