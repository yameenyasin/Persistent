// Controller for Carousel Data
Persistent.controller('Carousel', function ($scope, $http, $timeout) {
  $scope.CarouselData = [];
  $scope.currentItem = null;

  // Get Carousel data from JSON
  var promise = $http.get("data/CarouselData.json");
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

  //set currentItem to item selected from carousel
  $scope.setCurrentItem = function (selectedItem) {
    $scope.currentItem = angular.copy(selectedItem);
  };

  // Bulid Slides for Carousel - No of slides to be displayed in variable "count"
  $scope.$watch('CarouselData', function (values) {
    
    if ($scope.CarouselData.length > 0) {
    
      $scope.carouselGroupItems = [];
      
      var index, groupedData = [], // Will contain final carousel data to be displayed.
        dataItem = [], // Temporary variable to build the groupedData array.
        count = 4, // No of Images to be displayed in one carousel slide.
        size = $scope.CarouselData.length; // Total no of items.
      
      for (index = 0; index < size;) {
        dataItem = [];
        for (var i = 0; i < count && index < size; i += 1, index += 1) {
          dataItem.push($scope.CarouselData[index]);
        }
        groupedData.push(dataItem);
      }
      $scope.carouselGroupItems = groupedData;
    }
  }, true);
  
  // True if Carousel item is selected else false
  $scope.checkClass = function(item){
    console.log(item == $scope.currentItem);
    if(item == $scope.currentItem) {
      return "selected";
    }
    else{
      return "";
    }
  };
  
});