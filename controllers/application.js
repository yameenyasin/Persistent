// Create Angular Module
var Persistent = angular.module('Persistent', []);

//app controller constructor
Persistent.controller('appController', function ($scope, $http, $timeout) {

  $scope.loader = true;

  //partial view urls
  $scope.carouselURL = "views/carousel.html";
  $scope.descriptionURL = "views/description.html";
  $scope.formURL = "views/form.html";
  $scope.tableURL = "views/table.html";

});