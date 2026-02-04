# API'S List For DevTinder

## authRouter

-POST /api/auth/signup
-POST /api/auth/login
-POST /api/auth/logout

## profileRouter

-POST /api/user-profile/view
-PATCH /api/user-profile/edit
-PATCH /api/user-Profile/forgot-password

## connectionRequestRouter

-POST /request/send/intrested/:userID
-POST /request/send/ignore/:userId
- combined -> -POST /request/send/:status/:userId

-POST /request/review/accepted/:userId
-POST /request/review/reject/:userId
- combined -> -POST /request/review/:status/:requestId

## userRouter

-GET /user/connections
-GET /user/request
-GET /user/feed - get the profile of other users on the platform
