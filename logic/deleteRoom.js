const Room = require('../models/rooms');
const { successHandle, errorHandle } = require('../handler');
const deleteRoomAll = async (res) => {
    const rooms = await Room.deleteMany({});
    successHandle(res, []);
};
const deleteRoomSingle = async (res, req) => {
    const id = req.url.split('/').pop();
    //刪除單筆
    try {
        const rooms = await Room.findByIdAndDelete(id);
        successHandle(res, {});
    } catch (error) {
        errorHandle(res, error, '沒有此id');
    }
};

module.exports = {
    deleteRoomAll,
    deleteRoomSingle,
};
