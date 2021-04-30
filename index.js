var express = require('express');
var app = express();
let fs = require('fs');
var path = require('path');
var server = require('http').Server(app);
var io = require('socket.io')(server);
const { exec } = require('child_process');
app.use(express.static('public')); 

var message1 = "";
var message2 = "";

function guard1(datas11){
	fs.writeFile("ejemplo1.c", datas11, function(err) {if(err) {return;}}); 
}
function guard2(datas22){
	fs.writeFile("ejemplo2.c", datas22, function(err) {if(err) {return;}}); 
}
io.on('connection', function(socket) { 
  socket.emit('message1', message1); 
  socket.on('new-message1', function(data1) { 
    guard1(data1);
    message1=data1; 
    io.sockets.emit('message1', message1); 
  }); 
}); 
io.on('connection', function(socket) { 
  socket.emit('message2', message2); 
  socket.on('new-message2', function(data2) { 
    guard2(data2);
    message2=data2;
    io.sockets.emit('message2', message2); 
  }); 
}); 
//-------------------------------------------------
var message3 = "";
var message4 = "";

function guard3(datas33){
	fs.writeFile("input33.txt", datas33, function(err) {if(err) {return;}}); 
}
function guard4(datas44){
	fs.writeFile("input44.txt", datas44, function(err) {if(err) {return;}}); 
}
io.on('connection', function(socket) { 
  socket.emit('message3', message3); 
  socket.on('new-message3', function(data3) { 
    message3=data3; 
    io.sockets.emit('message3', message3); 
    exec(data3+" | tee input33.txt");
  }); 
}); 
io.on('connection', function(socket) { 
  socket.emit('message4', message4); 
  socket.on('new-message4', function(data4) { 
    message4=data4;
    io.sockets.emit('message4', message4); 
    exec(data4+" | tee input44.txt");
  }); 
}); 
//-------------------------------------------------
var message5 = "";
var message6 = "";

io.on('connection', function(socket) { 
fs.readFile('input33.txt', 'utf-8', (err, data5a) => {if(err){}else{message5=data5a;}}); 
  socket.emit('message5', message5); 
}); 
io.on('connection', function(socket) { 
fs.readFile('input44.txt', 'utf-8', (err, data6a) => {if(err){}else{message6=data6a;}});
    io.sockets.emit('message6', message6); 
});

server.listen(1212, function() { 
  console.log('bien...');
});




