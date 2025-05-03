--------------------------------------------------------------------
run the application using this command 

node index1.js
--------------------------------------------------------------------

use a post request below to get the token 

url : "http://localhost:3001/login"

WITH request body 

{
    "username":"mayurpaunipagar",
    "password":"mayurpaunipagar"
}

example response

{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJtYXl1cnBhdW5pcGFnYXIiLCJpYXQiOjE3NDYxMDczODQsImV4cCI6MTc0NjExMDk4NH0.DF2d3FmgpQXNH28p-mQ9VKzQHOe28YZRTTdoVx2Gk-M"
}

--------------------------------------------------------------------

use the post request below to upload the image

<Request>
url : "http://localhost:3001/api/upload-image"

put headers with 
key = authorization
value = Bearer "token_value" 

example 
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJtYXl1cnBhdW5pcGFnYXIiLCJpYXQiOjE3NDYxMDczODQsImV4cCI6MTc0NjExMDk4NH0.DF2d3FmgpQXNH28p-mQ9VKzQHOe28YZRTTdoVx2Gk-M

under body use form-data
key=image
value="browse the file to upload"

<Response>
{
    "message": "Image uploaded successfully",
    "file": {
        "filename": "1746108059000-800721441-cheque_leaf.jpeg",
        "url": "http://localhost:3001/uploads/1746108059000-800721441-cheque_leaf.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlbmFtZSI6IjE3NDYxMDgwNTkwMDAtODAwNzIxNDQxLWNoZXF1ZV9sZWFmLmpwZWciLCJpYXQiOjE3NDYxMDgwNTksImV4cCI6MTc0NjEwODk1OX0.qmMBIY0rWQ5KjoqO2-iu9nKsNWnRvzV_b6MZgDP9FSs",
        "size": 193797,
        "mimetype": "image/jpeg"
    }
}

the url present in the response is valid for 15minutes.

--------------------------------------------------------------------




