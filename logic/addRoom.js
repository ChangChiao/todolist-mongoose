const Room = require('../models/rooms');
const { successHandle, errorHandle } = require('../handler');
const addRoom = (res, req, body) => {
    req.on('end', async () => {
        try {
            const data = JSON.parse(body);
            console.log('data', data);
            const { name, price, rating } = data;
            const newRoom = await Room.create({
                name,
                price,
                rating,
            });
            successHandle(res, newRoom);
        } catch (error) {
            errorHandle(res, error, '欄位沒有正確，或是沒有此id');
            console.log(error);
        }
    });
    successHandle(res, rooms);
};

module.exports = addRoom;
