var app = require('http').createServer(handler),
  io = require('socket.io').listen(app),
  fs = require('fs'),
  mainSocket;

var databaseUrl = "mongodb://127.0.0.1:27017/contest"; // "username:password@example.com/mydb"
var collections = ["practices", "appointments","users"];
var mongojs = require("mongojs");
var db = mongojs.connect(databaseUrl, collections);
var ObjectId = mongojs.ObjectId;
app.listen(3000);

io.sockets.on('connection', function(socket) {
  db.practices.find( function(err, practices) {
    socket.on("getOffices", function(data) {
      socket.emit('offices', JSON.stringify(practices));
    });
  });

  socket.on("updateCheckin",function(data){
  	//db.appointments.update({_})
  	console.log(db.appointments.find(ObjectId(data.apptId)));
  	db.appointments.update(
  		{_id:ObjectId(data.apptId)},
  		{
  			$set:{"checkedIn":true}
  		},
  		function(err,value){
  			socket.emit("checkinUpdated", JSON.stringify(data));
  	});
  });
  	


  socket.on("getAppointments", function(data) {
	var results = db.practices.find({officeId:parseInt(data.id)}, function(err, office){
		socket.emit('appointments', JSON.stringify(office[0]));
	})
  });
  socket.on("sendLogin", function(user){
  	var obj = {
  		"personal.emailAddress":user.email,
  		"system.password":user.password
  	};

  	db.users.find(obj,function(err, data){
  		socket.emit("loggedIn", data)
  	});
  })
  socket.on("saveYourAppointment", function(data) {
  	db.appointments.save(data, function(err, value){
  		db.appointments.find(function(err, value){
  			socket.emit("getYourAppointments", value)
  		})
  	});
  	//socket.emit('appointments', JSON.stringify(db));
  	//db.appointments.insert(data);
	// var results = db.contest.find({officeId:parseInt(data.id)}, function(err, office){
	// 	socket.emit('appointments', JSON.stringify(office[0]));
	// })
  });
  socket.on("getApptByGuid",function(userId){
  	console.log(userId)
  	//{userId:userId.user},
  	db.appointments.find({userId:userId.user},function(err, value){
  			socket.emit("apptByGuidRecieved", value)
  		})
  	// db.appointments.find(function(data){
  	// 	console.log(data)
  	// 	socket.emit("apptByGuidRecieved",data);
  	// })
  });
//FrontDesk
	socket.on("getAppointmentsByOfficeId", function(data){
		var queryObject = {officeId:parseInt(data.id)};
		db.appointments.find(queryObject, function(err, value){
			socket.emit("appointmentsByOfficeId", value);
		});
	})

});

function handler(req, res) {

}