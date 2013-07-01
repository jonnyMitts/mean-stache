'use strict';

angular.module('bbContestApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/Schedule',{
        templateUrl:'views/schedule.html',
        controller:'ScheduleCtrl'
      })
      .when("/Appointments/:id",{
        templateUrl:'views/appointments.html',
        controller:'AppointmentsCtrl'
      })
      .when("/Records",{
        templateUrl:'views/records.html',
        controller:'RecordsCtrl'
      })
      .when("/Record/:id",{
        templateUrl:'views/record.html',
        controller:'RecordCtrl'
      })
      .when("/Checkin",{
        templateUrl:'views/checkin.html',
        controller:'CheckInCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
