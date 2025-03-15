# DevTinder APIs

## authRouter

POST  /api/user/new
POST /api/login
POST /api/logout

## profileRouter

GET /api/profile
PATCH /api/update/profile
PATCH /api/update/password

## connectionRequestRouter

POST /api/request/send/interested/:userId
POST /api/request/send/ignored/:userId
POST /request/review/accepted/:requestId
POST /request/review/rejected/:requestId

POST /request/review/:status/:requestId

## userRouter

GET /api/user/connections
GET /api/user/requests/received
GET /api/user/feed 