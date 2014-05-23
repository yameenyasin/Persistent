// Controller for Form Data
Persistent.controller('Form', function ($scope, $http) {
  // Get User data from JSON
  promise = $http.get("data/UserData.json");
  promise.success(function (data, status) {
    //add contact json object to the angular scope
    $scope.UserData = data;
    console.log('AJAX succesfull, status: ', status);
  });
  promise.error(function (data, status) {
    console.log('AJAX failed, status: ', status);
  });

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
  
  // Set sort order reverse to true
  $scope.reverse = true;  
});

// Email match Directive
Persistent.directive('emailMatch', [function () {
    return {
        restrict: 'A',
        scope:true,
        require: 'ngModel',
        link: function (scope, elem , attrs,control) {
            var checker = function () {
 
                //get the value of the first password
                var e1 = scope.$eval(attrs.ngModel); 
 
                //get the value of the other password  
                var e2 = scope.$eval(attrs.emailMatch);
                return e1 == e2;
            };
            scope.$watch(checker, function (n) {
 
                //set the form control to valid if both 
                //passwords are the same, else invalid
                control.$setValidity("unique", n);
            });
        }
    };
}]);