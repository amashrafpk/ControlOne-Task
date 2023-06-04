
const express = require("express");
const app = new express ();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const Log = require('log'),
    log = new Log('debug')

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

app.get('/',function(req,res){
  res.redirect('index.html'); 
});

io.on('connection',function(socket){
  socket.on('stream',function(image){
    socket.broadcast.emit('stream',image);
  });
});

http.listen(port,function(){
    log.info('Server running on port %s',port);
});
