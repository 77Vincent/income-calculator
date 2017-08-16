var App = angular.module("App", []);

App.controller("AppController", [
  "$scope",
  function ($scope) {

    $scope.data = [{
      label: "Save",
      suffix: undefined, 
      model: null,
    }, {
      label: "Average interest rate",
      suffix: "%", 
      model: null,
    }, {
      label: "Duration",
      suffix: "Years", 
      model: null,
    }];
  }
]);