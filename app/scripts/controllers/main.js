'use strict';

angular.module('bbContestApp')
  .controller('MainCtrl', function ($scope) {
    $scope.navigation = [
      'Schedule',
      'Records',
      'Checkin'
    ];
    $scope.checkin = function(){
      socket.broadcast.emit('righthand', {msg:"handshake"});
    }
  })
  .controller('ScheduleCtrl', function ($scope) {
    $scope.offices= [];
      window.wSocket.emit("getOffices",{name:"Jon"});
      window.wSocket.on("offices", function(data){
        $scope.offices = (JSON.parse(data));
        console.log($scope.offices.length)
        $scope.$apply();
      });
  })
  .controller('AppointmentsCtrl', function ($scope,$rootScope) {
    $scope.currentDate = new Date();
    $scope.appointments = [
      {time:"10:30 AM",doctor:"Dr. Nose1"},
      {time:"12:30 AM",doctor:"Dr. Nose1"},
      {time:"1:30 PM",doctor:"Dr. Nose1"},
      {time:"230 PM",doctor:"Dr. Nose1"},
      {time:"345 PM",doctor:"Dr. Nose1"},
    ];
    $scope.applyForAppointment = function(evt){
      console.log(evt.appointment.time);
      $rootScope.$broadcast("openModal", evt.appointment)
      $('#appointment-modal').modal('show')
    }
  })
  .controller('RecordsCtrl', function ($scope) {
    $scope.records = [
      {visitId:1,date:"10/10/2011", symptoms:"Headaches", diagnosis:"caffeine withdrawal", medications:"advil", materials:["http://en.wikipedia.org/wiki/Headache","http://www.webmd.com/migraines-headaches/default.htm","http://www.webmd.com/migraines-headaches/guide/triggers-caffeine"]},
      {visitId:2,date:"01/10/2012", symptoms:"Headaches", diagnosis:"caffeine withdrawal", medications:"advil", materials:["http://en.wikipedia.org/wiki/Headache","http://www.webmd.com/migraines-headaches/default.htm","http://www.webmd.com/migraines-headaches/guide/triggers-caffeine"]},
      {visitId:3,date:"02/10/2013", symptoms:"Headaches", diagnosis:"caffeine withdrawal", medications:"advil", materials:["http://en.wikipedia.org/wiki/Headache","http://www.webmd.com/migraines-headaches/default.htm","http://www.webmd.com/migraines-headaches/guide/triggers-caffeine"]},
    {visitId:4,date:"10/10/2013", symptoms:"Headaches", diagnosis:"caffeine withdrawal", medications:"advil", materials:["http://en.wikipedia.org/wiki/Headache","http://www.webmd.com/migraines-headaches/default.htm","http://www.webmd.com/migraines-headaches/guide/triggers-caffeine"]},
    ];
  })
  .controller('RecordCtrl', function ($scope) {
  $scope.record = {visitId:1,date:"10/10/2011", symptoms:"Headaches", diagnosis:"caffeine withdrawal", medications:"advil", materials:["http://en.wikipedia.org/wiki/Headache","http://www.webmd.com/migraines-headaches/default.htm","http://www.webmd.com/migraines-headaches/guide/triggers-caffeine"],text:"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dignissim congue nibh, vel convallis augue ullamcorper a. Curabitur placerat, ligula vel elementum imperdiet, nunc ipsum luctus arcu, et rutrum diam nunc eu nulla. Sed elit est, interdum quis nunc nec, consequat eleifend ipsum. Nulla facilisi. Nam a pharetra sem, sed imperdiet nunc. Praesent elementum enim ac tristique sodales. Suspendisse sollicitudin sapien enim, in lobortis augue eleifend id.</p><p>Aenean arcu urna, rutrum ac sagittis eget, mattis et tellus. Sed non porttitor justo, ut convallis ligula. Curabitur semper interdum laoreet. Proin ullamcorper mi eget odio mollis, eu consectetur diam fringilla. Nam dapibus placerat tellus non hendrerit. Vestibulum ultrices imperdiet velit. Maecenas bibendum lorem sit amet mollis viverra. Ut et auctor risus, nec tincidunt risus. Praesent aliquam est erat, eu venenatis dolor accumsan non. Fusce consectetur pulvinar dolor quis egestas. Duis odio tellus, imperdiet cursus dui nec, semper tincidunt quam. Integer vitae eleifend ante. Cras bibendum eu libero in fringilla. Morbi varius mattis condimentum.</p>"}
  })
  .controller('CheckInCtrl', function($scope){
    $scope.appointments = [
      {name:"Dr. Nose2", practice:"Atlanta ENT", type:"ENT", address:"123 Main Street", city:"Atlanta", state:"GA", officeId:2, time:"1:30 PM",doctor:"Dr. Nose1"}
    ];
    $scope.checkedin = function(evt){
       window.wSocket.emit("test",this.appointment);       
    }
  })
  .controller('MdlAppointment', function ($scope) {
    $scope.$on('openModal', function(e,arg){
           $scope.message = arg
           console.log($scope.message)
           $scope.title = "Appointment Application";
           $scope.time =$scope.message.time;
    })
    
  })

