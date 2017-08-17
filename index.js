var App = angular.module("App", []);

App.controller("AppController", [
  "$scope",
  function ($scope) {

    $scope.input = [{
        label: "Current deposit",
        suffix: undefined,
        model: 0,
      },
      {
        label: "Monthly save",
        suffix: undefined,
        model: 0,
      }, {
        label: "Average annual interest rate",
        suffix: "%",
        model: 0,
      }, {
        label: "Duration",
        suffix: "Years",
        model: 1,
      }
    ];

    $scope.output = [{
      label: "Final deposit",
      model: null 
    }];

    var deposit = $scope.input[0].model;

    $scope.calculate = function () {
      var deposit = $scope.input[0].model;
      var save = $scope.input[1].model;
      var rate = $scope.input[2].model;
      var duration = $scope.input[3].model;

      (deposit + (save * 12)) * rate

      $scope.output[0].model = deposit;
    };

  }
]);