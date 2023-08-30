const { SerialPort } = require("serialport");

const portName = "COM11";
const baudRate = 9600;

const port = new SerialPort(
  {
    path: portName,
    baudRate: baudRate,
  },
  function (err) {
    if (err) {
      return console.log("Error: ", err.message);
    }
  }
);

// The open event is emitted when port is opened, by default it is oppened if autoOpen option
// in SerialPort constructore is not set to false
port.on("open", function () {
  console.log("port is open");
});

//send data
const sendDirection = (button) => {
  console.log("Try to send direction ", button);
  port.write(button, function (err) {
    if (err) {
      return console.log("Error on write: ", err.message);
    }
    console.log("Sent direction ", button);
  });
};

// Open errors will be emitted as an error event
port.on("error", function (err) {
  console.log("Error: ", err.message);
});

port.on("readable", function () {
  console.log("Response:", port.read().toString("utf-8"));
});

module.exports = { sendDirection };
