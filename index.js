var App = angular.module("App", []);

App.controller("AppController", [
  "$scope",
  function ($scope) {

    $scope.data = [{
      income: [
        "月存款",
        "一个月能存多少钱？"
      ]
    }, {
      income: [
        "月存款",
        "一个月能存多少钱？"
      ]

    }]
  }
]);