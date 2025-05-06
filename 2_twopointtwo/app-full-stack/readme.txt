Hit this command in app-full-stack folder

sudo docker-compose up -d

------------------------------------------------------------------------------------------------------------

folder structure

app-full-stack/
├── backend/
│   ├── src/
│   │   └── index.js
│   ├── Dockerfile
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── Login.jsx
│   │   └── index.js
│   ├── Dockerfile
│   ├── package.json
│   └── .env
├── docker-compose.yml

------------------------------------------------------------------------------------------------------------
Follow below steps for running without docker
run frontend code using 

go to folder root and run the following commands

1. delete package.json
2. delete nodemodules
3. run in terminal (npm install)
4. run in terminal (npm start)

------------------------------------------------------------------------------------------------------------

run mongodb 

goto folder where mongodb is installed 
in my local system its installed in downloads in below path

/Users/apple/Downloads/old-20250416/mongodb-macos-aarch64-8.0.4/bin
make sure this folder is available 
"/Downloads/mongo-data"

run this command 

1. sudo ./mongod --dbpath ~/Downloads/mongo-data

------------------------------------------------------------------------------------------------------------

run backend code using below instructions
 
1. go to the backend folder
2. delete the nodemodules
3. delete the packagelock.json
4. run in terminal (npm install)
5. run in terminal (node index.js)

------------------------------------------------------------------------------------------------------------

How to run the application?

1. first hit the "/register" api using below uri

"http://localhost:3001/register"

requestbody would be 

{
    "username":"mayurpaunipagar",
    "password":"mayurpaunipagar"
}

2. now go to frontend app and put username and password
    next hit login button
    the response would be login successful token stored

--------- validate mondo db

1. goto mongodbcompass
2. goto fullstack database
3. check in users schema if the username and password is stored.


