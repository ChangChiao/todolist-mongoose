const Room = require("../models/rooms");
const {successHandle} = require("../handler");
const getRoom = async(res) => {
    const rooms = await Room.find();
    successHandle(res, rooms);
}

module.exports = getRoom
