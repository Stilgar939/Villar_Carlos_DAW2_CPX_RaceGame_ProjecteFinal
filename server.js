var express = require('express')
var app = express()
var socket = require('socket.io');

portName = '/dev/ttyACM0';

var server = app.listen(3000, function () {
    console.log('Servidor funcionant pel port 4000, http://localhost:4000 :)');
});


var io = socket(server);

const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort(portName);
const parser = new Readline();
port.pipe(parser);


parser.on('data', (data) => {
    console.log(data);
    let accel = data.split(',');
    accel[0] = parseFloat(accel[0]);
    accel[1] = parseFloat(accel[1]);
    accel[2].slice(accel[2].length - 1)
    accel[2] = parseFloat(accel[2]);
    io.sockets.emit("accelerometer", accel);
    console.log(accel);
});

