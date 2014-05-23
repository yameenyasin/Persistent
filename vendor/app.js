// Create Angular Module
var Persistent = angular.module('Persistent', []);

//app controller constructor
Persistent.controller('appController', function ($scope, $http, $timeout) {
  $scope.CarouselData = [];
  $scope.loader = true;


  // Get Carousel data from JSON
  var promise = $http.get("CarouselData.json");
  promise.success(function (data, status) {

    //add carousel json object to the angular scope
    $scope.CarouselData = data;

    //Set the Current item to first element in CarouselData
    $scope.currentItem = $scope.CarouselData[0] || null;

    //simulate client server comm
    $timeout(function () {
      $scope.loader = false;
    }, 3000);

    console.log('AJAX succesfull, status: ', status);
  });
  promise.error(function (data, status) {
    console.log('AJAX failed, status: ', status);
  });


  // Get User data from JSON
  promise = $http.get("UserData.json");
  promise.success(function (data, status) {
    //add contact json object to the angular scope
    $scope.UserData = data;
    console.log('AJAX succesfull, status: ', status);
  });
  promise.error(function (data, status) {
    console.log('AJAX failed, status: ', status);
  });


  //partial view urls
  $scope.headerURL = "partials/header-view.html";
  $scope.propertyURL = "partials/property-view.html";
  $scope.carouselURL = "partials/carousel.html";
  $scope.descriptionURL = "partials/description.html";
  $scope.formURL = "partials/form.html";
  $scope.tableURL = "partials/table.html";

  //selected contact reference
  $scope.currentItem = null;

  //set selected contact
  $scope.setCurrentItem = function (selectedItem) {
    $scope.currentItem = selectedItem;
  };

  // Add a new user
  $scope.addNewUser = function (newUser) {
    // Push the new user details into UserData Array
    $scope.UserData.push({
      "name": newUser.name,
      "email": newUser.email,
      "age": newUser.age
    });
    console.log("Add Success");
  };

  // Bulid Slides for Carousel - 5 Slides
  $scope.$watch('CarouselData', function (values) {

    if ($scope.CarouselData.length > 0) {
      $scope.carouselGroupItems = [];
      var index, groupedData = [], // Array of arrays
        dataItem = [], // Temporary variable to build the groupedData array
        count = 4, // No of Images to be displayed in one carousel slide
        size = $scope.CarouselData.length; // Total no of items

      for (index = 0; index < size;) {
        dataItem = [];
        for (i = 0; i < count && index < size; i += 1, index += 1) {
          dataItem.push($scope.CarouselData[index]);
        }
        groupedData.push(dataItem);
      }
      $scope.carouselGroupItems = groupedData;
    }
  }, true);
});