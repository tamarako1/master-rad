const mongoose = require("mongoose");
const { Schema, model } = mongoose;

mongoose.connect("mongodb://localhost:27017/trajectories", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db = mongoose.connection;

db.on("error", () => {
  console.log("Error in mongo connection");
});

db.once("open", () => console.log("Mongo connection established"));

const trajectorySchema = new Schema({
  trajectory: { type: String, unique: true },
  date: { type: Date, default: Date.now },
});

const trajectoryModel = model("trajectories", trajectorySchema);

async function createTrajectory(trajectory) {
  const trajectoryToSave = transformString(trajectory);
  console.log("trajectoryToSave in db: ", trajectoryToSave);
  try {
    await trajectoryModel.create({
      trajectory: trajectoryToSave,
    });
    console.log("trajectory in db saved");
  } catch (error) {
    console.log("Mongoose error: ", error);
    console.log("Error code:  ", error.code);
    if (error.code === 11000) {
      throw Error("trajectories already exists");
    }
  }
}

async function getTrajectories() {
  const tr = await trajectoryModel.find();
  const list = [];

  tr.forEach((trajectory) => {
    list.push(trajectory.trajectory);
  });
  return list;
}
async function deleteTrajectory(trajectory) {
  try {
    const response = await trajectoryModel.deleteOne({ trajectory });
    console.log("response", response);
    console.log("trebalo bi da je obrisana putanja ", trajectory);
  } catch (error) {
    console.log("greska prilikom birsanja putanje ", error);
  }
}

function transformString(inputString) {
  let outputString = "";
  let currentNumber = "";

  for (let i = 0; i < inputString.length; i++) {
    const char = inputString[i];

    if (/[0-9]/.test(char)) {
      currentNumber += char;
    } else {
      if (currentNumber) {
        outputString += currentNumber + "-";
        currentNumber = "";
      }

      switch (char) {
        case "u":
          outputString += "up,";
          break;
        case "l":
          outputString += "left,";
          break;
        case "r":
          outputString += "right,";
          break;
        case "d":
          outputString += "down,";
          break;
        default:
          break;
      }
    }
  }

  //da ostane array
  if (outputString.endsWith(",")) {
    outputString = outputString.slice(0, -1);
  }

  return outputString;
}

module.exports = {
  createTrajectory,
  getTrajectories,
  deleteTrajectory,
  trajectoryModel,
};
