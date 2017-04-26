'use strict';
describe('HomeCtrl', function() {
    var scope; //we'll use this scope in our tests
    var ele;
    //mock Application to allow us to inject our own dependencies
    beforeEach(
        angular.mock.module('mobileWebApp')
        //use the name of your application found in your application.js
        //Line: var application = angular.module('<YourApplicationName>'
    );
   
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(
        angular.mock.inject(
            function($rootScope, $controller) {
                //create an empty scope
                scope = $rootScope.$new();
           
                // $httpBackend 
                //     .when('GET', 'data/phones.json') 
                //     .respond([{},{},{},{}]);

                //declare the controller and inject our empty scope
                $controller('HomeCtrl', {
                    $scope: scope
                });
                // scope.$digest(); 
                // $httpBackend.flush();
                //use your controller's name
            }
        )
    );

    beforeEach(
        angular.mock.inject(
            function($rootScope, $controller, $compile, $location) {
                ele = angular.element('<div id="navbar" class="collapse navbar-collapse">' +
                    '<ul class="nav navbar-nav" >' +
                    '<li active-link="active"> <a href="/">Home</a></li>' +
                    '<li active-link="active"> <a href="/phones">Phones</a></li>' +
                    '<li active-link="active"> <a href="/plans">Plans</a></li>' +
                    '<li active-link="active"> <a href="/cart">Cart</a></li>' +
                    '</ul>');            
                //create an empty scope
                scope = $rootScope.$new();
                //add this element to the scope.
                $compile(ele)(scope);
                scope.$digest();
                //declare the controller and inject our empty scope
                $controller('HomeCtrl', {
                    $scope: scope
                });
                //use your controller's name
            }
        )
    );
     
    it('should have 5000 carousel interval', function(){
        expect(scope.interval).toBe(5000);
    });

    it('should be 4 slides', function(){
        expect(scope.slides.length).toBe(4);
    });

    // This tests the routing for home  
    it('should map routes to controllers', inject(function($route) {
        expect($route.routes['/'].controller).toBe('HomeCtrl');
        expect($route.routes['/'].templateUrl).toEqual('views/home.html');
        expect($route.routes[null].redirectTo).toEqual('/');
        expect($route.routes['/phones'].controller).toBe('PhoneCtrl');
        expect($route.routes['/phones'].templateUrl).toEqual('views/phones.html');
    }));
});