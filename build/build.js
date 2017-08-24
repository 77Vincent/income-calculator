"use strict";

var App = angular.module("App", []);

App.controller("AppController", ["$scope", function ($scope) {

  /**
   * @param {Number} number
   * @param {Integer} round 
   * @returns {Number} number to certain decimal point
   */
  var rounding = function rounding(number, round) {
    var dr = Math.pow(10, round);

    return Math.round(number * dr) / dr;
  };

  /**
   * @param {Number} result of exponentiation
   * @param {Number} exponent 
   * @returns {Number} base of exponentiation
   */
  var getBase = function getBase(result, exponent) {

    var value = Math.pow(result, 1 / exponent);

    return rounding(value, 2);
  };

  // Model of input
  $scope.input = [{
    label: "Current deposit",
    title: "Basic",
    suffix: undefined
  }, {
    label: "Income",
    suffix: "Monthly basis"
  }, {
    label: "Expense",
    suffix: "Monthly basis"
  }, {
    label: "Annual interest rate",
    title: "Interest rate",
    suffix: "%",
    onChange: function onChange() {
      $scope.input[4].model = rounding(this.model / 12, 3);
      $scope.input[5].model = rounding(this.model / 365, 3);
    }
  }, {
    label: "Monthly interest rate",
    suffix: "%",
    onChange: function onChange() {
      $scope.input[3].model = rounding(this.model * 12, 3);
      $scope.input[5].model = rounding(this.model / 12, 3);
    }
  }, {
    label: "Daily interest rate",
    suffix: "%",
    onChange: function onChange() {
      $scope.input[3].model = rounding(this.model * 365, 3);
      $scope.input[4].model = rounding(this.model * 12, 3);
    }
  }, {
    label: "For how many",
    title: "Duration",
    suffix: "Years",
    onChange: function onChange() {
      $scope.input[7].model = rounding(this.model * 12, 0);
      $scope.input[8].model = rounding(this.model * 365, 0);
    }
  }, {
    label: "For how many",
    suffix: "months",
    onChange: function onChange() {
      $scope.input[6].model = rounding(this.model / 12, 0);
      $scope.input[8].model = rounding(this.model * 30.41, 0);
    }
  }, {
    label: "For how many",
    suffix: "days",
    onChange: function onChange() {
      $scope.input[6].model = rounding(this.model / 365, 0);
      $scope.input[7].model = rounding(this.model / 30.41, 0);
    }
  }];

  // Model of output
  $scope.output = [{
    label: "Final deposit"
  }, {
    label: "Total interest"
  }];

  $scope.calculate = function () {
    var d = $scope.input[0].model; // deposit
    var s = $scope.input[1].model - $scope.input[2].model; // monthly save
    var r = $scope.input[4].model; // monthly rate
    var l = $scope.input[7].model; // how many month

    for (var i = 0; i < l; i++) {
      d = d * (1 + r / 100) + s;
    }

    $scope.output[0].model = rounding(d, 2);
    $scope.output[1].model = rounding(d - s * l - $scope.input[0].model, 2);
  };
}]);
