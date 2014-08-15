var angular = require('angular');

var app = angular.module('angulask', []);

app.controller('anguilleController', ['$scope',function($scope){
    $scope.eels = ['eel000009', 'elo'];
}]);