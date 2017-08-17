var App = angular.module("App", []);

App.controller("AppController", [
  "$scope",
  function ($scope) {

    $scope.input = [{
        label: "Current deposit",
        suffix: undefined,
        model: null,
      },
      {
        label: "Monthly save",
        suffix: undefined,
        model: null,
      }, {
        label: "Average annual interest rate",
        suffix: "%",
        model: null,
      }, {
        label: "Duration",
        suffix: "Years",
        model: null,
      }, {
        label: "Duration",
        suffix: "months",
        model: this[0],
        disabled: true,
      }
    ];

    $scope.output = [{
      label: "Final deposit",
      model: null 
    }];

    var deposit = $scope.input[0].model;

    $scope.calculate = function () {
      var d = $scope.input[0].model;
      var s = $scope.input[1].model;
      var r = $scope.input[2].model;
      var y = $scope.input[3].model;


      $scope.output[0].model = (d + (s * 12)) * Math.pow((1 + r/100), y);
    };

  }
]);