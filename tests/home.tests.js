'use strict';
describe('HomeCtrl', function() {
    var scope; //we'll use this scope in our tests
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
     
    it('should have 5000 carousel interval', function(){
        expect(scope.interval).toBe(5000);
    });

    it('should be 4 slides', function(){
        expect(scope.slides.length).toBe(4);
    });
});