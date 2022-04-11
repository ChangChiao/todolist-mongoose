const Room = require('../models/rooms');
const { successHandle, errorHandle } = require('../handler');
const patchRoom = (res, req, body) => {
    const id = req.url.split("/").pop();
    req.on("end", async () => {
      const { price } = JSON.parse(body);
      try {
        const rooms = await Room.findByIdAndUpdate(id, { price });
        successHandle(res, rooms)
      } catch (error) {
        errorHandle(res, error, "沒有此id")
      }
    });
}

module.exports = patchRoom