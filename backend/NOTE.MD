## Env Vars
JWT_SECRET_KEY=iamsecret => process.env.JWT_SECRET
MONGODBURI_TEST=mongodb+srv://gobusiness_test:gobusiness_test@cluster0-jvnif.mongodb.net/test?retryWrites=true&w=majority
MONGODBURI=mongodb+srv://gobusiness:gobusiness@cluster0-25ydr.mongodb.net/test?retryWrites=true&w=majority

## User signup
> POST public localhost:4000/api/auth/signup
Request
<pre><code>
{
	"firstname": "test",
	"lastname": "tester",
	"phone": "08123456789",
	"email": "test@test.com",
	"password": "123456"
}
</code>
</pre>
Response
<pre><code>
{
  "status": true,
  "message": "User signup successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZGVjYjlmY2QzNjA5MTRhNDZiYzJlYSIsImF1dGgiOlsidXNlciJdLCJpYXQiOjE1OTE2NTk0MjksImV4cCI6MTU5MTg3NTQyOX0.0AoDXKZ5f4d4O4mU_f7tJycZKYZScUPhtYK2RD5aaz0"
}
</code>
</pre>

## User login
>POST public localhost:4000/api/auth/login
Request
<pre><code>
{
	"email": "test@test.com",
	"password": "123456"
}
</code>
</pre>
Response
<pre><code>
{
  "status": true,
  "message": "User login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZGVjYjlmY2QzNjA5MTRhNDZiYzJlYSIsImF1dGgiOlsidXNlciJdLCJpYXQiOjE1OTE2NTk3MjUsImV4cCI6MTU5MTg3NTcyNX0.rNn1VRyIO2a8GHJ7vCxB1QfE7GOrhO5BQerfInZM9VQ"
}
</code>
</pre>

## User Data
> Get user by token
> GET private localhost:4000/api/auth/
Request
<pre><code>

</code>
</pre>
Response
<pre><code>
{
  "status": true,
  "message": "User records",
  "data": {
    "id": "5edecb9fcd360914a46bc2ea",
    "firstname": "test",
    "lastname": "tester",
    "phone": "08123456789",
    "email": "test@test.com",
    "auth": [
      "user"
    ]
  }
}
</code>
</pre>

## User List by Admin
> GET private localhost:4000/api/users/
Request
<pre><code>

</code>
</pre>
Response
<pre><code>
{
  "status": true,
  "message": "Users List",
  "data": [
    {
      "role": "user",
      "auth": [
        "user",
        "admin"
      ],
      "_id": "5ed4d1ed87e0321d4478f39a",
      "firstname": "test",
      "lastname": "tester",
      "phone": "08123456789",
      "email": "tester@test.com",
      "createdAt": "2020-06-01T10:01:17.888Z",
      "updatedAt": "2020-06-02T15:06:11.640Z",
      "__v": 16
    },
    {
      "role": "user",
      "auth": [
        "user",
        "admin"
      ],
      "_id": "5edecb9fcd360914a46bc2ea",
      "firstname": "test",
      "lastname": "tester",
      "phone": "08123456789",
      "email": "test@test.com",
      "createdAt": "2020-06-08T23:37:04.779Z",
      "updatedAt": "2020-06-08T23:48:11.869Z",
      "__v": 3
    }
  ]
}
</code>
</pre>

</code>
</pre>
Response
<pre><code>

</code>
</pre>

## Toggle Admin Auth
> PUT private localhost:4000/api/users/5edecb9fcd360914a46bc2ea/admin
Request
<pre><code>
</code>
</pre>
Response
<pre><code>
{
  "status": true,
  "message": "Admin auth changed",
  "data": {
    "role": "user",
    "auth": [
      "user",
      "admin"
    ],
    "_id": "5edecb9fcd360914a46bc2ea",
    "firstname": "test",
    "lastname": "tester",
    "phone": "08123456789",
    "email": "test@test.com",
    "password": "$2a$10$yuwUGJDNknraM26x.iFVnu5PDIJDuvBl9XA30J43Mcv3w0cFfISTK",
    "createdAt": "2020-06-08T23:37:04.779Z",
    "updatedAt": "2020-06-08T23:48:11.869Z",
    "__v": 3
  }
}
</code>
</pre>

## Update User Password
>PUT public localhost:4000/api/users/password
Request
<pre><code>
{
	"email": "tester@test.com",
	"password": "1234567"
}
</code>
</pre>
Response
<pre><code>
{
  "status": true,
  "message": "User password updated successful",
  "data": {
    "role": "user",
    "auth": [
      "user",
      "admin"
    ],
    "_id": "5ed4d1ed87e0321d4478f39a",
    "firstname": "test",
    "lastname": "tester",
    "phone": "08123456789",
    "email": "tester@test.com",
    "password": "$2a$10$yohwXFR5gaTw6ENgsWqcUuSgjojOpitLBUdAx05tPWOaz0wgTZ7Ti",
    "createdAt": "2020-06-01T10:01:17.888Z",
    "updatedAt": "2020-06-08T23:55:48.702Z",
    "__v": 16
  }
}
</code>
</pre>

## Delete User By Id
>DELETE private localhost:4000/api/users/5ed4d1ed87e0321d4478f39a
Request
<pre><code>
</code>
</pre>
Response
<pre><code>
{
  "status": true,
  "message": "User deleted",
  "data": "5ed4d1ed87e0321d4478f39a"
}
</code>
</pre>

## Create a Business
>POST private localhost:4000/api/business
> No User can register more than two business
Request
<pre><code>
{
	"name":"Bus1",
	"description":"Bus1 desc",
	"address":"Bus1 addr",
	"email":"bus2@bus1.com",
	"phone":"08123456789",
	"cac_number":"cac2"
}
</code>
</pre>
Response
<pre><code>
{
  "status": true,
  "message": "Created new Business",
  "data": {
    "_id": "5eded917b944890b9014e6f3",
    "owner": "5eded8ddb944890b9014e6f2",
    "name": "Bus1",
    "description": "Bus1 desc",
    "address": "Bus1 addr",
    "cac_number": "cac2",
    "email": "bus2@bus1.com",
    "phone": "08123456789",
    "createdAt": "2020-06-09T00:34:31.498Z",
    "updatedAt": "2020-06-09T00:34:31.498Z",
    "__v": 0
  }
}
</code>
</pre>

## Update a Business
> PUT private localhost:4000/api/business/5eded917b944890b9014e6f3
> You can only update your business
Request
<pre><code>
{
	
	"email":"bus2u@bus1.com",
	 "name": "Bus1 updated",
    "description": "Bus1 desc u",
    "address": "Bus1 addrupdatedu",
    "cac_number": "cac2222"
}
</code>
</pre>
Response
<pre><code>
{
  "status": true,
  "message": "Business data updated",
  "data": {
    "_id": "5eded917b944890b9014e6f3",
    "owner": "5eded8ddb944890b9014e6f2",
    "name": "Bus1 updated",
    "description": "Bus1 desc u",
    "address": "Bus1 addrupdatedu",
    "cac_number": "cac2222",
    "email": "bus2u@bus1.com",
    "phone": "08123456789",
    "createdAt": "2020-06-09T00:34:31.498Z",
    "updatedAt": "2020-06-09T00:37:54.829Z",
    "__v": 0
  }
}
</code>
</pre>
## Get all a Business by filter
> GET gets all http://localhost:4000/api/business
> By filter http://localhost:4000/api/business?ownerId=5ed4d1ed87e0321d4478f39a&businessId=5ed4d1ed87e0321d4478f39a
Request
<pre><code>
</code>
</pre>
Response
<pre><code>
{
  "status": true,
  "message": "List of business/SMEs on GoBusiness",
  "data": [
    {
      "_id": "5ed507201beea601f0704866",
      "owner": null,
      "name": "Bus1 updated",
      "description": "Bus1 desc u",
      "address": "Bus1 addr u",
      "cac_number": "cac12",
      "email": "bus1@bus1.com",
      "phone": "08123456789",
      "createdAt": "2020-06-01T13:48:16.594Z",
      "updatedAt": "2020-06-01T14:14:17.011Z",
      "__v": 0
    },
    {
      "_id": "5eded72fb944890b9014e6f1",
      "owner": {
        "_id": "5edecb9fcd360914a46bc2ea",
        "firstname": "test",
        "lastname": "tester",
        "phone": "08123456789",
        "email": "test@test.com"
      },
      "name": "Bus1",
      "description": "Bus1 desc",
      "address": "Bus1 addr",
      "cac_number": "cac1",
      "email": "bus1@bus1.com",
      "phone": "08123456789",
      "createdAt": "2020-06-09T00:26:23.895Z",
      "updatedAt": "2020-06-09T00:26:23.895Z",
      "__v": 0
    },
    {
      "_id": "5eded917b944890b9014e6f3",
      "owner": {
        "_id": "5eded8ddb944890b9014e6f2",
        "firstname": "test",
        "lastname": "tester",
        "phone": "08123456789",
        "email": "test2@test.com"
      },
      "name": "Bus1 updated",
      "description": "Bus1 desc u",
      "address": "Bus1 addrupdatedu",
      "cac_number": "cac2222",
      "email": "bus2u@bus1.com",
      "phone": "08123456789",
      "createdAt": "2020-06-09T00:34:31.498Z",
      "updatedAt": "2020-06-09T00:37:54.829Z",
      "__v": 0
    }
  ]
}
</code>
</pre>

## Create an Investment
>POSt public localhost:4000/api/investments
Request
<pre><code>
{
	"title":"Inv2",
	"description":"inv2 desc",
	"start_date":"2020/12/12",
	"end_date":"2021/12/12",
	"budget": 5000,
	"unitCost": 500,
	"interest": "10"
}
</code>
</pre>
Response
<pre><code>
{
  "status": true,
  "message": "Investment Created",
  "data": {
    "isVerified": false,
    "isDeleted": false,
    "_id": "5ededd91b944890b9014e6f4",
    "businessOwner": "5eded72fb944890b9014e6f1",
    "owner": "5edecb9fcd360914a46bc2ea",
    "title": "Inv2",
    "description": "inv2 desc",
    "start_date": "2020-12-11T23:00:00.000Z",
    "end_date": "2021-12-11T23:00:00.000Z",
    "budget": 5000,
    "unitCost": 500,
    "interest": "10",
    "investors": [],
    "createdAt": "2020-06-09T00:53:37.611Z",
    "updatedAt": "2020-06-09T00:53:37.611Z",
    "__v": 0
  }
}
</code>
</pre>
## Update Investment
>PUT private localhost:4000/api/investments/5ededd91b944890b9014e6f4
> U can only update ur investment ie the ones u created
> If a verified investment is updated, admin would have to re-verify
Request
<pre><code>
{
	"title":"Inv2 updas",
	"description":"inv2 desc u",
	"start_date":"2020/12/13",
	"end_date":"2021/12/12",
	"budget": 8000,
	"unitCost": 500,
	"interest": "10"
}
</code>
</pre>
Response
<pre><code>
{
  "status": true,
  "message": "Investment Updated",
  "data": {
    "isVerified": false,
    "isDeleted": false,
    "_id": "5ededd91b944890b9014e6f4",
    "businessOwner": "5eded72fb944890b9014e6f1",
    "owner": "5edecb9fcd360914a46bc2ea",
    "title": "Inv2 updas",
    "description": "inv2 desc u",
    "start_date": "2020-12-12T23:00:00.000Z",
    "end_date": "2021-12-11T23:00:00.000Z",
    "budget": 8000,
    "unitCost": 500,
    "interest": "10",
    "investors": [],
    "createdAt": "2020-06-09T00:53:37.611Z",
    "updatedAt": "2020-06-09T00:56:12.456Z",
    "__v": 0
  }
}
</code>
</pre>

## TOGGLE investment validity 
>PUT private/admin localhost:4000/api/investments/:investmentId/validity
Request
<pre><code>
</code>
</pre>
Response
<pre><code>
{
  "status": true,
  "message": "Investment verification completed",
  "data": {
    "isVerified": true,(watch this)
    "isDeleted": false,
    "_id": "5ed517d8b0b652193c3b8d45",
    "businessOwner": "5ed507201beea601f0704866",
    "owner": "5ed4d1ed87e0321d4478f39a",
    "title": "Inv2 updas",
    "description": "inv2 desc u",
    "start_date": "2020-12-12T23:00:00.000Z",
    "end_date": "2021-12-11T23:00:00.000Z",
    "budget": 8000,
    "unitCost": 500,
    "interest": "10",
    "investors": [
      {
        "_id": "5ed65b44c71b8210185fdb32",
        "investor": "5ed4d1ed87e0321d4478f39a",
        "units": 5
      },
      {
        "_id": "5ed65b5bc71b8210185fdb33",
        "investor": "5ed4d1ed87e0321d4478f39a",
        "units": 50
      },
      {
        "_id": "5ed65bac7fcfd426dc3a05d7",
        "investor": "5ed4d1ed87e0321d4478f39a",
        "units": 50
      }
    ],
    "createdAt": "2020-06-01T14:59:36.861Z",
    "updatedAt": "2020-06-09T00:59:57.668Z",
    "__v": 3
  }
}
</code>
</pre>

## Invest in an oppoertunity
> PUT private localhost:4000/api/investments/:investmentId/subscriptions
Request
<pre><code>
{
	"units": 50
}
</code>
</pre>
Response
<pre><code>
{
  "status": true,
  "message": "Investment registered",
  "data": {
    "isVerified": true,
    "isDeleted": false,
    "_id": "5ed517d8b0b652193c3b8d45",
    "businessOwner": "5ed507201beea601f0704866",
    "owner": "5ed4d1ed87e0321d4478f39a",
    "title": "Inv2 updas",
    "description": "inv2 desc u",
    "start_date": "2020-12-12T23:00:00.000Z",
    "end_date": "2021-12-11T23:00:00.000Z",
    "budget": 8000,
    "unitCost": 500,
    "interest": "10",
    "investors": [
      {
        "_id": "5ed65b44c71b8210185fdb32",
        "investor": "5ed4d1ed87e0321d4478f39a",
        "units": 5
      },
      {
        "_id": "5ed65b5bc71b8210185fdb33",
        "investor": "5ed4d1ed87e0321d4478f39a",
        "units": 50
      },
      {
        "_id": "5ed65bac7fcfd426dc3a05d7",
        "investor": "5ed4d1ed87e0321d4478f39a",
        "units": 50
      },
      {
        "_id": "5ededfa7b944890b9014e6f5",
        "investor": "5edecb9fcd360914a46bc2ea",
        "units": 50
      }
    ],
    "createdAt": "2020-06-01T14:59:36.861Z",
    "updatedAt": "2020-06-09T01:02:32.013Z",
    "__v": 4
  }
}
</code>
</pre>

## Get investors of a given investmentD
> GET private localhost:4000/api/investments/:investmentId/investors
Request
<pre><code>
</code>
</pre>
Response
<pre><code>
{
  "status": true,
  "message": "Investment investors list",
  "data": {
    "isVerified": true,
    "isDeleted": false,
    "_id": "5ed517d8b0b652193c3b8d45",
    "businessOwner": "5ed507201beea601f0704866",
    "owner": "5ed4d1ed87e0321d4478f39a",
    "title": "Inv2 updas",
    "description": "inv2 desc u",
    "start_date": "2020-12-12T23:00:00.000Z",
    "end_date": "2021-12-11T23:00:00.000Z",
    "budget": 8000,
    "unitCost": 500,
    "interest": "10",
    "investors": [
      
      {
        "_id": "5ededfa7b944890b9014e6f5",
        "investor": {
          "_id": "5edecb9fcd360914a46bc2ea",
          "firstname": "test",
          "lastname": "tester",
          "phone": "08123456789"
        },
        "units": 50
      }
    ],
    "createdAt": "2020-06-01T14:59:36.861Z",
    "updatedAt": "2020-06-09T01:02:32.013Z",
    "__v": 4
  }
}
</code>
</pre>
## GEt all investments of the current user
> GET private localhost:4000/api/users/investments
Request
<pre><code>

</code>
</pre>
Response
<pre><code>
{
  "status": true,
  "message": "List of all your investments",
  "data": [
    {
      "isVerified": true,
      "isDeleted": false,
      "_id": "5ed517d8b0b652193c3b8d45",
      "businessOwner": "5ed507201beea601f0704866",
      "owner": "5ed4d1ed87e0321d4478f39a",
      "title": "Inv2 updas",
      "description": "inv2 desc u",
      "start_date": "2020-12-12T23:00:00.000Z",
      "end_date": "2021-12-11T23:00:00.000Z",
      "budget": 8000,
      "unitCost": 500,
      "interest": "10",
      "investors": [
        
        {
          "_id": "5ededfa7b944890b9014e6f5",
          "investor": {
            "_id": "5edecb9fcd360914a46bc2ea",
            "firstname": "test",
            "lastname": "tester",
            "phone": "08123456789"
          },
          "units": 50
        }
      ],
      "createdAt": "2020-06-01T14:59:36.861Z",
      "updatedAt": "2020-06-09T01:02:32.013Z",
      "__v": 4
    }
  ]
}
</code>
</pre>
## Get all investments by filter
> possible filters
> http://localhost:4000/api/investments?businessId=5ed507201beea601f0704866&isVerified=true&investmentId=5ed517d8b0b652193c3b8d45
Request
<pre><code>
</code>
</pre>
Response
<pre><code>
{
  "status": true,
  "message": "List of Investments on GoBusiness",
  "data": [
    {
      "isVerified": true,
      "isDeleted": false,
      "_id": "5ed517d8b0b652193c3b8d45",
      "businessOwner": {
        "_id": "5ed507201beea601f0704866",
        "name": "Bus1 updated",
        "cac_number": "cac12",
        "email": "bus1@bus1.com",
        "phone": "08123456789"
      },
      "owner": "5ed4d1ed87e0321d4478f39a",
      "title": "Inv2 updas",
      "description": "inv2 desc u",
      "start_date": "2020-12-12T23:00:00.000Z",
      "end_date": "2021-12-11T23:00:00.000Z",
      "budget": 8000,
      "unitCost": 500,
      "interest": "10",
      "investors": [
        {
          "_id": "5ed65b44c71b8210185fdb32",
          "investor": "5ed4d1ed87e0321d4478f39a",
          "units": 5
        },
        {
          "_id": "5ed65b5bc71b8210185fdb33",
          "investor": "5ed4d1ed87e0321d4478f39a",
          "units": 50
        },
        {
          "_id": "5ed65bac7fcfd426dc3a05d7",
          "investor": "5ed4d1ed87e0321d4478f39a",
          "units": 50
        },
        {
          "_id": "5ededfa7b944890b9014e6f5",
          "investor": "5edecb9fcd360914a46bc2ea",
          "units": 50
        }
      ],
      "createdAt": "2020-06-01T14:59:36.861Z",
      "updatedAt": "2020-06-09T01:02:32.013Z",
      "__v": 4
    }
  ]
}
</code>
</pre>
## Delete a Business
>
Request
<pre><code>
</code>
</pre>
Response
<pre><code>
</code>
</pre>
## Delete a Business
>
Request
<pre><code>
</code>
</pre>
Response
<pre><code>
</code>
</pre>
## Delete a Business
>
Request
<pre><code>
</code>
</pre>
Response
<pre><code>
</code>
</pre>