var myApp = angular.module('mobileWebApp', ['ngRoute','ui.bootstrap', 'ngResource', 'LocalStorageModule']);

myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  
    $routeProvider.
    when('/phones', {
        templateUrl: 'views/phones.html',
        controller: 'PhoneCtrl'
    }).
    when('/plans', {
        templateUrl: 'views/plans.html',
        controller: 'PlanCtrl'
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
    $locationProvider.html5Mode({enabled: true, requireBase: false});
}]);

myApp.controller('HomeCtrl',function($log, $scope) {
    $log.debug('initializing HomeCtrl');
    $scope.interval = 5000; // carousel animation interval
    // $scope.active = 0;
    //carousel slide info
    // Use the phoneFactory here too!!!!!
	$scope.slides = [
	    {
	    	id: 0,
	        img: "images/apple-iphone7.jpg",
	        url: "#/phones",
	        text: "New Shiny iPhone 7",
	        title: "iPhone 7"
	    },
	    {
	    	id: 1,
	        img: "images/lg-v20-titan.jpg",
	        url: "#/phones",
	        text: "New Shiny LG V20",
	        title: "LG V20"
	    },
	    {
	    	id: 2,
	        img: "images/samsung-galaxys7edge.jpg",
	        url: "#/phones",
	        text: "New Shiny Samsung Galaxy S7 Edge",
	        title: "Samsung Galaxy S7 Edge"
	    },
	    {
	    	id: 3,
	        img: "images/lg-g6-black.jpg",
	        url: "#/phones",
	        text: "New Shiny LG G6",
	        title: "LG G6"
	    }
	];
});


myApp.directive('activeLink', ['$location', function (location) {
	console.log('IN DIRECTIVE');
    return {
        restrict: 'A',
        link: function(scope, element, attrs, controller) {
        	console.log(element.children(':first').attr('href'));
            // var clazz = attrs.activeLink;
            var clazz = element.attr('active-link');
                    	console.log('ACTIVELINK ' + element.attr('active-link'));

	        // var path = attrs.href;
	        var path = element.children(':first').attr('href');
	        path = path.substring(2); //hack because path does not return including hashbang
	        console.log('PATH' + path);
	        scope.location = location;
	        scope.$watch('location.path()', function (newPath) {
	        	console.log('NEWPATH' + newPath);
	        	
	          if (path === newPath) {
	          	console.log('EQUAL' + newPath + ' ' + clazz)
	            element.addClass(clazz);
	          } else {
	            element.removeClass(clazz);
	          }
	        });
        }
    };
}]);

// Factory for the data for the phones view
myApp.factory('phoneFactory', function($resource){
    return $resource(
        '/Data/phones.json',
        {},
        {
            get: {
                method: 'GET',
                params:{},
                isArray:true
            }
        }
    );
});

// Controller for the phones view
myApp.controller('PhoneCtrl', function($scope, phoneFactory, CartProperties){
    phoneFactory.get(function(data) {
        $scope.phones = data;
    });

    $scope.addPhone = function(item, cost) {
    	CartProperties.addToCart(item, cost);
    };
});

// Factory for the data for the plans view
myApp.factory('planFactory', function($resource) {
    return $resource(
        '/Data/plans.json', {}, {
        get: {
            method: 'GET',
            params: {},
                isArray: true
            }
        }
    );
});

// Controller for the plans view
myApp.controller('PlanCtrl', function($scope, planFactory, CartProperties) {
    planFactory.get(function(data) {
        $scope.plans = data;
    });

    $scope.addPlan = function(item, cost) {
    	CartProperties.addToCart(item, cost);
    };
});


// service to access local Local storage
myApp.service('CartProperties', function(localStorageService) {
	return {
		addToCart: function(item,cost) {
			if (!localStorageService.get('cart')) {	
				var cart = [];
				// cart.push({"item": item, "cost": cost});
				// localStorageService.set('cart', cart);
			} else {
				var cart = localStorageService.get('cart');
				// cart.push({"item": item, "cost": cost});
				// localStorageService.set('cart', cart);
			}
			cart.push({"item": item, "cost": cost});
			localStorageService.set('cart', cart);
		},
		getCart: function() {
			return localStorageService.get('cart');
		},
		setCart: function(array) {
			localStorageService.set('cart', array);
		}
	}
});

// controller for the shopping cart
myApp.controller('CartCtrl', function($scope, CartProperties) {
	$scope.cart = CartProperties.getCart();

	$scope.remove = function(array, index) {
		array.splice(index, 1);
		CartProperties.setCart(array);
	};
});