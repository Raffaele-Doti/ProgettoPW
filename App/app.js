// Define the `studentApp` module
(function () {
  'use strict';

  angular
      .module('app', ['ui.router', 'ngMessages', 'ngStorage', 'ngMockE2E'])
      .config(config)
      .run(run);

  function config($stateProvider, $urlRouterProvider) {
      // default route
      $urlRouterProvider.otherwise("/");

      // app routes
      $stateProvider
          .state('home', {
              url: '/',
              templateUrl: 'App/pages/home/home.view.html',
              controller: 'Home.homeController',
              controllerAs: 'vm'
          })
          .state('login', {
              url: '/login',
              templateUrl: 'App/pages/login/login.view.html',
              controller: 'Login.LogController',
              controllerAs: 'vm'
          });
  }

  function run($rootScope, $http, $location, $localStorage) {
      // keep user logged in after page refresh
      if ($localStorage.currentUser) {
          $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
      }

      // redirect to login page if not logged in and trying to access a restricted page
      $rootScope.$on('$locationChangeStart', function (event, next, current) {
          var publicPages = ['/login'];
          var restrictedPage = publicPages.indexOf($location.path()) === -1;
          if (restrictedPage && !$localStorage.currentUser) {
              $location.path('/login');
          }
      });
  }
})();