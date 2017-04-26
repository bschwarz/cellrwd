'use strict';
describe('HomeCtrl', function() {
    var scope; //we'll use this scope in our tests
    //mock Application to allow us to inject our own dependencies
    beforeEach(
        angular.mock.module('application')
        //use the name of your application found in your application.js
        //Line: var application = angular.module('<YourApplicationName>'
    );
   
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(
        angular.mock.inject(
            function($rootScope, $controller) {
                //create an empty scope
                scope = $rootScope.$new();
           
                //declare the controller and inject our empty scope
                $controller('HomeCtrl', {
                    $scope: scope
                });
 
                //use your controller's name
            }
        )
    );
     
    // tests start here
});