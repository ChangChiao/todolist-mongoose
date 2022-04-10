const mongoose = require("mongoose");
const roomSchema = new mongoose.Schema(
  {
    name: String,
    price: {
      type: Number,
      required: [true, "價格必填"],
    },
    rating: Number,
    createdAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
  },
  {
    versionKey: false,
    // timestamps: true,
    // collation: 'room' //限定collection name
  }
);

const Room = mongoose.model("Room", roomSchema);
//mongo會將collection 強制轉小寫並加上s
module.exports = Room;

// var a = {
//   title: {
//     type: String,
//     required: [true, "任務名稱必填"],
//   },
//   status:{
//     type: Number,
//     default: 0,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//     select: false,
//   },
// };
