const express = require("express");
const serialPort = require("./serialPort");

const asyncSetTimeout = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const app = express();
app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});

//accept button pressed and send direction tu car via serial port
app.get("/api/get/button/:button", async (req, res) => {
  const button = req.params.button;

  console.log("button koji je pritisnut: ", button);
  serialPort.sendDirection(button);
  res.send(button);
});

app.get("/api/get/direction/:direction", async (req, res) => {
  const directionArray = req.params.direction; //ovo je string
  const arrayOfMovements = directionArray.split(",");

  console.log("Array of steps ", arrayOfMovements);

  for (const movement of arrayOfMovements) {
    const [step, direction] = movement.split("-");

    for (let i = 0; i < step; i++) {
      serialPort.sendDirection(direction);
      if (i < step - 1) {
        await asyncSetTimeout(2000);
      }
    }
    await asyncSetTimeout(2000);
  }
  res.send(directionArray);
});
