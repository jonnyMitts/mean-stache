var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs');

var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;    


app.listen(3000);

var request;
function handler (req, res) {
  
  fs.readFile(__dirname + req.url,
  function (err, data) {
    console.log("Helloooooooo")
    if (err) {
      res.writeHead(500);
      return res.end('Error loading ' + req.url);
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  socket.on('getOffices', function (data) {
        MongoClient.connect('mongodb://127.0.0.1:27017/contest', function(err, db) {
          console.log("err: " + err);
          if(err) throw err;
          
          //var collection = db.use('contest');
          //console.log(db.find());
          //socket.emit('offices',db)
  //         socket.broadcast.emit('offices',JSON.stringify(collection));
          socket.emit('offices',JSON.stringify(db));
      });
  });
});



  