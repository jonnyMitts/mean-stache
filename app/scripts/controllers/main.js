'use strict';
var user,app={};

app.config = {
  debug:true
}

angular.module('bbContestApp')
    .controller('LoginCtrl', function ($scope) {
        //Checks if user is logged in, if so it redirects to the main jump screen
        if (typeof user !== "undefined" && user.loggedIn)
            window.location = "/#/Main";

        if(app.config.debug){
            // $scope.username = "jmittelbronn@sapient.com";
            // $scope.password = "m3l155412";
        }

        //Login submit handler
        $scope.loginSubmit = function (evt) {
            window.wSocket.emit("sendLogin", {
                email: $scope.username,
                password: $scope.password
            });
        }
        //Login listener
        window.wSocket.on("loggedIn", function (userObj) {
            if (userObj.length) {
                user = userObj[0];
                user.loggedIn = true;
                window.location = "/#/Main";
            }
        });
    })
    //This is the jump screen controller
    .controller('MainCtrl', function ($scope, $routeParams) {
        //This tests to see if the user is logged in, redirects home if not
        if (typeof user === "undefined" || !user.loggedIn) window.location = "/#/";
        
        $scope.navigation = [
            'Schedule',
            'Records',
            'Checkin'
        ];
        $scope.goto = function (nav) {
            if (nav === "Checkin") {
                window.location = "/#/Checkin/" + user.personal.userGuid;
            } else {
                window.location = "/#/" + nav;
            }
        }
        // $scope.checkin = function() {
        //   console.log($routePa)
        //   socket.broadcast.emit('getAppointmentsByUserId', {
        //     msg: "msg"
        //   });
        // }
    })
    .controller('ScheduleCtrl', function ($scope) {
        if (typeof user === "undefined" || !user.loggedIn) window.location = "/#/";
        $scope.offices = [];
        window.wSocket.emit("getOffices", {});
        window.wSocket.on("offices", function (data) {
            $scope.offices = (JSON.parse(data));
            $scope.$apply();
        });
    })
    .controller('AppointmentsCtrl', function ($scope, $routeParams, $rootScope) {
        if (typeof user === "undefined" || !user.loggedIn) window.location = "/#/";
        $scope.currentDate = new Date();
        console.log($routeParams)
        window.wSocket.emit("getAppointments", $routeParams);
        window.wSocket.on("appointments", function (data) {
            $scope.office = (JSON.parse(data));
            $scope.$apply();
        });
        $scope.applyForAppointment = function (evt) {
            $scope.office.selectedAppt = evt.appointment;
            $rootScope.$broadcast("openModal", $scope.office)
            $('#appointment-modal').modal('show')
        }
    })
    .controller('RecordsCtrl', function ($scope) {
        if (typeof user === "undefined" || !user.loggedIn) window.location = "/#/";
        $scope.records = [{
            visitId: 1,
            date: "10/10/2011",
            symptoms: "Headaches",
            diagnosis: "caffeine withdrawal",
            medications: "advil",
            materials: ["http://en.wikipedia.org/wiki/Headache", "http://www.webmd.com/migraines-headaches/default.htm", "http://www.webmd.com/migraines-headaches/guide/triggers-caffeine"]
        }, {
            visitId: 2,
            date: "01/10/2012",
            symptoms: "Headaches",
            diagnosis: "caffeine withdrawal",
            medications: "advil",
            materials: ["http://en.wikipedia.org/wiki/Headache", "http://www.webmd.com/migraines-headaches/default.htm", "http://www.webmd.com/migraines-headaches/guide/triggers-caffeine"]
        }, {
            visitId: 3,
            date: "02/10/2013",
            symptoms: "Headaches",
            diagnosis: "caffeine withdrawal",
            medications: "advil",
            materials: ["http://en.wikipedia.org/wiki/Headache", "http://www.webmd.com/migraines-headaches/default.htm", "http://www.webmd.com/migraines-headaches/guide/triggers-caffeine"]
        }, {
            visitId: 4,
            date: "10/10/2013",
            symptoms: "Headaches",
            diagnosis: "caffeine withdrawal",
            medications: "advil",
            materials: ["http://en.wikipedia.org/wiki/Headache", "http://www.webmd.com/migraines-headaches/default.htm", "http://www.webmd.com/migraines-headaches/guide/triggers-caffeine"]
        }, ];
    })
    .controller('RecordCtrl', function ($scope) {
        if (typeof user === "undefined" || !user.loggedIn) window.location = "/#/";
        $scope.record = {
            visitId: 1,
            date: "10/10/2011",
            symptoms: "Headaches",
            diagnosis: "caffeine withdrawal",
            medications: "advil",
            materials: ["http://en.wikipedia.org/wiki/Headache", "http://www.webmd.com/migraines-headaches/default.htm", "http://www.webmd.com/migraines-headaches/guide/triggers-caffeine"],
            text: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dignissim congue nibh, vel convallis augue ullamcorper a. Curabitur placerat, ligula vel elementum imperdiet, nunc ipsum luctus arcu, et rutrum diam nunc eu nulla. Sed elit est, interdum quis nunc nec, consequat eleifend ipsum. Nulla facilisi. Nam a pharetra sem, sed imperdiet nunc. Praesent elementum enim ac tristique sodales. Suspendisse sollicitudin sapien enim, in lobortis augue eleifend id.</p><p>Aenean arcu urna, rutrum ac sagittis eget, mattis et tellus. Sed non porttitor justo, ut convallis ligula. Curabitur semper interdum laoreet. Proin ullamcorper mi eget odio mollis, eu consectetur diam fringilla. Nam dapibus placerat tellus non hendrerit. Vestibulum ultrices imperdiet velit. Maecenas bibendum lorem sit amet mollis viverra. Ut et auctor risus, nec tincidunt risus. Praesent aliquam est erat, eu venenatis dolor accumsan non. Fusce consectetur pulvinar dolor quis egestas. Duis odio tellus, imperdiet cursus dui nec, semper tincidunt quam. Integer vitae eleifend ante. Cras bibendum eu libero in fringilla. Morbi varius mattis condimentum.</p>"
        }
    })
    .controller('CheckInCtrl', function ($scope) {
       // if (typeof user === "undefined" || !user.loggedIn) window.location = "/#/";
        $scope.appointments = [];

        window.wSocket.emit("getApptByGuid", {
            user: user.personal.userGuid
        });
        window.wSocket.on("apptByGuidRecieved", function (data) {
            $scope.appointments = data;
            $scope.$apply();
        });
        $scope.checkin = function(evt){
          window.wSocket.emit("updateCheckin",{apptId:evt.appointment._id});
          window.wSocket.on("checkinUpdated",function(data){
            window.wSocket.emit("getApptByGuid", {
              user: user.personal.userGuid
            });
          });
          
        }
    })
    .controller('MdlAppointment', function ($scope, $route) {
        if (typeof user === "undefined" || !user.loggedIn) window.location = "/#/";
        var context = $scope;
        $scope.$on('openModal', function (e, office) {
            $scope.office = office
            $scope.title = "Appointment Application";
            $scope.time = $scope.office.selectedAppt;
        })
        $scope.submitAppointment = function (report) {
            var appt = {
                officeId: $scope.office.officeId,
                officeName: $scope.office.name,
                appt: $scope.office.selectedAppt,
                userId: user.personal.userGuid,
                userName: (user.personal.fname.slice(0,1) + user.personal.lname.slice(0,3)).toUpperCase(),
                checkedIn: false,
                report: report
            };
            window.wSocket.emit("saveYourAppointment", appt);
            window.wSocket.on("getYourAppointments", function (data) {
                window.location = "#/Checkin/" + user.personal.userGuid.toString();
            });
            $('#appointment-modal').modal('hide')
        }
    })
//FrontDesk
  .controller('Admin_CheckinsCtrl', function ($scope, $routeParams){
    $scope.appointments = [];
    window.wSocket.emit("getAppointmentsByOfficeId",$routeParams)
    window.wSocket.on("appointmentsByOfficeId",function(data){
      $scope.appointments = data;
      console.log($scope.appointments);
      $scope.$apply();
    })
  })
// .controller("YourAppointmentsCtrl", function($scope, $routeParams){
//   console.log($routeParams);
// });