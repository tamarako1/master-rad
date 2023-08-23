const { SerialPort } = require("serialport"); //obavezno zagrade kod {SerialPort}, inace kaze da SerialPOrt nije konstruktor

const portName = "COM11"; // stavi odgovarajući serijski
const baudRate = 9600; //1200;

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

/*
port.write("Hi Mom!"); //send string
port.write(Buffer.from("Hi Mom!")); //send buffer
*/

port.on("readable", function () {
  console.log("Response:", port.read().toString("utf-8"));
});

/*
// Read data that is available but keep the stream in "paused mode"
port.on("readable", function () {
  console.log("Data:", port.read());
});

// Switches the port into "flowing mode"
port.on("data", function (data) {
  console.log("Data:", data);
});

// Pipe the data into another stream (like a parser or standard out)
const lineStream = port.pipe(new Readline());

//moze i ovako
//const parser = port.pipe(new ReadlineParser()) //gde je ReadlineParser importovan const { SerialPort, ReadlineParser } = require('serialport')

*/

module.exports = { sendDirection };
