const http = require('http');
const mongoose = require('mongoose');
const Room = require('./models/rooms');
const { header } = require('./config');
const { errorHandle } = require('./handler');
const { getRoom, addRoom, deleteRoom, patchRoom } = require('./logic');
//connect db
mongoose
    .connect('mongodb://localhost:27017/hotel')
    .then(() => {
        console.log('connect success');
    })
    .catch((error) => {
        console.log(error.reason);
    });

//create instance //
// const testRoom = new Room({
//   name: "高級雙人房",
//   price: 3000,
//   rating: 4.5,
// });

// testRoom
//   .save()
//   .then(() => {
//     console.log("add Data success");
//   })
//   .catch((error) => {
//     console.log(error.errors.price.properties.message);
//   });

const requestListener = async (req, res) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    if (req.url === '/rooms') {
        switch (req.method) {
            case 'GET':
                getRoom(res);
                break;
            case 'POST':
                addRoom(res, req, body);
                break;
            case 'DELETE':
                deleteRoom.deleteRoomAll(res);
                break;
            default:
                break;
        }
    } else if (req.url.startsWith('/rooms/')) {
        switch (req.method) {
            case 'DELETE':
                getRoom(res);
                break;
            case 'PATCH':
                addRoom(res, req, body);
                break;
            default:
                break;
        }
    } else {
        errorHandle(res, {}, '無此網路路由', 404);
    }

    // if (req.url === '/rooms' && req.method === 'GET') {
    //     getRoom(res);
    // } else if (req.url === '/rooms' && req.method === 'POST') {
    //     addRoom(res, req, body);
    // } else if (req.url === '/rooms' && req.method === 'DELETE') {
    //     deleteRoom.deleteRoomAll(res);
    // } else if (req.url.startsWith('/rooms/') && req.method === 'DELETE') {
    //     deleteRoom.deleteRoomSingle(res, req);
    // } else if (req.url.startsWith('/rooms/') && req.method === 'PATCH') {
    //     patchRoom(res, req, body);
    // } else {
    //     errorHandle(res, {}, '無此網路路由', 404);
    // }
};

const server = http.createServer(requestListener);
server.listen(3005);
