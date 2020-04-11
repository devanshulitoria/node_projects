var socket=io.connect('http://192.168.1.117:4000');
/*var msg=document.getElementById("message");

var output=document.getElementById("output");
var handle = document.getElementById("handle");
 btn.addEventListener('click',function(){
     console.log(msg.value);
    socket.emit('chat',{
        message:msg.value,
        handle:handle.value
    });
 });*/
 var lastX, lastY;
 var canvas=document.getElementById("container");
 var ctx=document.getElementById("container").getContext("2d");;
 canvas.ontouchmove = function(event) {mouseDown(event)};

 function mouseDown(event) {
    // alert("me called");
    var x = event.touches[0].clientX -50;
  var y = event.touches[0].clientY - 100;
  socket.emit('chat',{
    xaxis:x,
    yaxis:y
});
}

var btn=document.getElementById("erase");
btn.addEventListener('click',function(){
    socket.emit('erase',{
        message:'erase',
    });
});

socket.on('erase',function(data){
    clearArea();
 });

 socket.on('chat',function(data){
    Draw(data.xaxis,data.yaxis, true);
 });

 function Draw(x, y, isDown) {
    if (isDown) {
        ctx.beginPath();
        ctx.strokeStyle = $('#selColor').val();
        ctx.lineWidth = $('#selWidth').val();
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
    }
    lastX = x; lastY = y;
}

function clearArea() {
    // Use the identity matrix while clearing the canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}