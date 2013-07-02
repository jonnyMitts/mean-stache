var app = require('http').createServer(handler),
  io = require('socket.io').listen(app),
  fs = require('fs'),
  mainSocket;

var databaseUrl = "mongodb://127.0.0.1:27017/test"; // "username:password@example.com/mydb"
var collections = ["contest"]
var db = require("mongojs").connect(databaseUrl, collections);

app.listen(3000);
io.sockets.on('connection', function(socket) {
  db.contest.find({
    "practice": "Atlanta ENT"
  }, function(err, practice) {
    socket.on("getOffices", function(data) {
      socket.emit('offices', JSON.stringify(practice));
    })

  });
});

function handler(req, res) {

}