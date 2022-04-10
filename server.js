const http = require("http");
const mongoose = require("mongoose");
const Room = require("./models/rooms");
const headers = require("./headerConfig");
//connect db
mongoose
  .connect("mongodb://localhost:27017/hotel")
  .then(() => {
    console.log("connect success");
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
  // console.log(req.url);
  // res.end();
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  if (req.url === "/rooms" && req.method === "GET") {
    const rooms = await Room.find();
    res.writeHead(200, headers);
    res.write(
      JSON.stringify({
        status: "success",
        rooms,
      })
    );
    res.end();
  } else if (req.url === "/rooms" && req.method === "POST") {
    req.on("end", async () => {
      try {
        const data = JSON.parse(body);
        console.log("data", data);
        const { name, price, rating } = data;
        const newRoom = await Room.create({
          name,
          price,
          rating,
        });
        res.writeHead(200, headers);
        res.write(
          JSON.stringify({
            status: "success",
            rooms: newRoom,
          })
        );
        res.end();
      } catch (error) {
        res.writeHead(400, headers);
        res.write(
          JSON.stringify({
            status: "fail",
            message: "欄位沒有正確，或是沒有此id",
            error: error,
          })
        );
        console.log(error);
        res.end();
      }
    });
  } else if (req.url === "/rooms" && req.method === "DELETE") {
    const rooms = await Room.deleteMany({});
    res.writeHead(200, headers);
    res.write(
      JSON.stringify({
        status: "success",
        rooms: [],
      })
    );
    res.end();
  } else if (req.url.startsWith("/rooms/") && req.method === "DELETE") {
    const id = req.url.split("/").pop();
    //刪除單筆
    try {
      const rooms = await Room.findByIdAndDelete(id);
      res.writeHead(200, headers);
      res.write(
        JSON.stringify({
          status: "success",
          // rooms: [],
        })
      );
      res.end();
    } catch (error) {
      res.writeHead(400, headers);
      res.write(
        JSON.stringify({
          status: "fail",
          message: "沒有此id",
          error: error,
        })
      );
      console.log(error);
      res.end();
    }
  } else if (req.url.startsWith("/rooms/") && req.method === "PATCH") {
    const id = req.url.split("/").pop();
    req.on("end", async () => {
      const { price } = JSON.parse(body);
      try {
        const rooms = await Room.findByIdAndUpdate(id, { price });
        res.writeHead(200, headers);
        res.write(
          JSON.stringify({
            status: "success",
            rooms
          })
        );
        res.end();
      } catch (error) {
        res.writeHead(400, headers);
        res.write(
          JSON.stringify({
            status: "fail",
            message: "沒有此id",
            error: error,
          })
        );
        res.end();
      }
    });
    //修改單筆
  } else {
    res.writeHead(404, headers);
    res.write(
      JSON.stringify({
        status: "false",
        message: "無此網路路由",
      })
    );
    res.end();
  }
};
/**
 * @description
 */

const server = http.createServer(requestListener);
server.listen(3005);
