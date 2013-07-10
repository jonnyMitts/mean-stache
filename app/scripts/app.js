'use strict';

angular.module('bbContestApp', [])
  .config(function ($routeProvider) {
    $routeProvider
     .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/Main', {
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
      // .when("/YourAppointments/:id",{
      //   templateUrl:'views/yourAppointments.html',
      //   controller:'YourAppointmentsCtrl'
      // })
      .when("/Records",{
        templateUrl:'views/records.html',
        controller:'RecordsCtrl'
      })
      .when("/Record/:id",{
        templateUrl:'views/record.html',
        controller:'RecordCtrl'
      })
      .when("/Checkin/:id",{
        templateUrl:'views/checkin.html',
        controller:'CheckInCtrl'
      })
      //FrontDesk
      .when("/Admin/Checkins/:id",{
        templateUrl:"views/admin.checkins.html",
        controller:'Admin_CheckinsCtrl'
      })
      .when("/Admin/Checkins/:id/:userId", {
        templateUrl:"views/admin.checkins.reports.html",
        controller:'Admin_ReportsCtrl'
      })
      // .otherwise({
      //   redirectTo: '/'
      // });
  });
