'use strict';
describe('PhoneCtrl', function() {
    var scope; //we'll use this scope in our tests
    var $globalHttpBackend;
   
    //mock Application to allow us to inject our own dependencies
    beforeEach(
        angular.mock.module('mobileWebApp')
        //use the name of your application found in your application.js
        //Line: var application = angular.module('<YourApplicationName>'
    );
 
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(
        angular.mock.inject(
            function($rootScope, $controller, $compile, $location, $httpBackend) {
                $globalHttpBackend = $httpBackend;
                $globalHttpBackend.when('GET', '/Data/phones.json').respond([
                    {
                        "title": "Fancy Phone",
                        "desc": "A Phone",
                        "price": 100
                    },
                    {
                        "title": "Super Fancy Phone",
                        "desc": "Another Phone",
                        "price": 200
                    },
                    {
                        "title": "Super Deluxe Fancy Phone",
                        "desc": "Some Phone",
                        "price": 300
                    },
                    {
                        "title": "Super Deluxe Ultra Fancy Phone",
                        "desc": "That Phone",
                        "price": 1000
                    }
                ]);
           
            //create an empty scope
            scope = $rootScope.$new();
            scope.$digest();
           
            //declare the controller and inject our empty scope
            $controller('PhoneCtrl', {$scope: scope});
        }
    )
);
    it('should be 4 phones', function(){
        $globalHttpBackend.flush();
        expect(scope.phones.length).toBe(4);
    });
});