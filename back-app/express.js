const express = require("express");
const serialPort = require("./serialPort");
const trajectory = require("./mongo");
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
app.post("/api/post/button/:button", async (req, res) => {
  const button = req.params.button;

  console.log("button koji je pritisnut: ", button);
  serialPort.sendDirection(button);
  res.send(button);
});

app.get("/api/get/trajectories", async (req, res) => {
  const listOfTrajectories = await trajectory.getTrajectories();
  console.log("lista trajektorija ", listOfTrajectories);
  res.send(listOfTrajectories);
});

app.post("/api/post/direction/:direction/:setToDb", async (req, res) => {
  const directionArray = req.params.direction;
  const setToDb = req.params.setToDb;

  const arrayOfMovements = directionArray.split(",");

  let response = false;
  console.log("Array of steps ", arrayOfMovements);
  console.log("set to db is ", setToDb);

  if (setToDb == "true") {
    try {
      await trajectory.createTrajectory(directionArray);
    } catch (error) {
      console.log("tamara error ", error);
      res.send({ error: 1 });
      response = true;
    }
  }
  if (!response && setToDb == "true") {
    res.send({ success: 1 });
  }
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
});

app.delete("/api/delete/:trajectoryToDelete", async (req, res) => {
  const trajectoryToDelete = req.params.trajectoryToDelete;
  console.log("trajekotory za brisaznje ", trajectoryToDelete);
  await trajectory.deleteTrajectory(trajectoryToDelete);
  res.send({ status: 200, body: "obrisana trajektorija" });
});

/*
async function fun() {
  const tr = await trajectory.trajectoryModel.create({
    trajectory: "tamara",
  });
  console.log("trajectory created ", tr);
  const string = "tamara";
  const res = await trajectory.deleteTrajectory("tamara");
  console.log("trajectory deleted ", res);
}
*/
