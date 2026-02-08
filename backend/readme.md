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

# Pagination in MongoDB

/feed?page=1&limit=10 -> first page will fetch first 10 connections
/feed?page=2&limit=10 -> frist 11-20 connections
/feed?page=3&limit=10 -> frist 21-30 connections

## two methods -> .skip(), .limit();

/feed?page=1&limit=10 -> .skip(0) & .limit(10);
/feed?page=2&limit=10 -> .skip(10) & .limit(10);
/feed?page=3&limit=10 -> .skip(20) & .limit(10);
