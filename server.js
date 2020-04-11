var express = require('express');
var socket = require('socket.io');
var PORT = process.env.PORT || 4000;
var app=express();
var server = app.listen(PORT,function(){
    console.log('server started');
});
app.use(express.static('public'));

var io =socket(server);
io.on('connection',function(socket){
    console.log("socket a gya");
    socket.on('chat',function(data){
        console.log(data.xaxis+"---"+data.yaxis);
        io.sockets.emit('chat',data);
    }).on('erase',function(data){
        console.log('erase called');
        io.sockets.emit('erase',data);
    })
    
});