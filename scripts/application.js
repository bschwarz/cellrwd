var myApp = angular.module('mobileWebApp', ['ngRoute','ui.bootstrap']);

myApp.config(['$routeProvider', function($routeProvider) {
  
    $routeProvider.
    when('/phones', {
        templateUrl: 'views/phones.html',
        controller: 'PhoneCtrl'
    }).
    when('/plans', {
        templateUrl: 'views/plans.html',
        controller: 'PlansCtrl'
    }).
    when('/cart', {
        templateUrl: 'views/cart.html',
        controller: 'CartCtrl'
    }).
    when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
    }).
    otherwise({
        redirectTo: '/'
    });
}]);