var App = angular.module("App", []);

App.controller("AppController", [
  "$scope",
  function ($scope) {

    var decimalRounding = 4;

    /**
     * @param {Number} number
     * @param {Integer} round 
     * @returns {Number} number to certain decimal point
     */
    var rounding = function (number, round) {
      var dr = Math.pow(10, round);

      return Math.round(number * dr) / dr;
    };

    /**
     * @param {Number} result of exponentiation
     * @param {Number} exponent 
     * @returns {Number} base of exponentiation
     */
    var getBase = function(result, exponent) {

      var value = Math.pow(result, 1 / exponent);

      return rounding(value, decimalRounding);
    };

    // Model of input
    $scope.input = [{
        // Basic
        label: "Current deposit",
        title: "Basic",
        suffix: undefined,
        model: null,
      },
      {
        label: "Monthly save",
        suffix: undefined,
        model: null,
      }, {
        // Interest rate
        label: "Annual interest rate",
        title: "Interest rate",
        suffix: "%",
        model: null,
        onChange: function () {
          $scope.input[3].model = rounding(this.model / 12, decimalRounding);
          $scope.input[4].model = rounding(this.model / 365, decimalRounding);
        }
      }, {
        label: "Monthly interest rate",
        suffix: "%",
        model: null,
        onChange: function () {
          $scope.input[2].model = rounding(this.model * 12, decimalRounding);
          $scope.input[4].model = rounding(this.model / 12, decimalRounding);
        }
      }, {
        label: "Daily interest rate",
        suffix: "%",
        model: null,
        onChange: function () {
          $scope.input[2].model = rounding(this.model * 365, decimalRounding);
          $scope.input[3].model = rounding(this.model * 12, decimalRounding);
        }
      }, {
        // Duration
        label: "For how many",
        title: "Duration",
        suffix: "Years",
        model: null,
        onChange: function () {
          $scope.input[6].model = rounding(this.model * 12, 2);
          $scope.input[7].model = rounding(this.model * 365, 2);
        }
      }, {
        label: "For how many",
        suffix: "months",
        model: null,
        onChange: function () {
          $scope.input[5].model = rounding(this.model / 12, 2);
          $scope.input[7].model = rounding(this.model * 30.41, 2);
        }
      }, {
        label: "For how many",
        suffix: "days",
        model: null,
        onChange: function () {
          $scope.input[5].model = this.model / 365;
          $scope.input[6].model = this.model / 30.41;
        }
      }
    ];

    // Model of output
    $scope.output = [{
      label: "Final deposit",
      model: null
    }];

    $scope.calculate = function () {
      var d = $scope.input[0].model;
      var s = $scope.input[1].model;

      var r = $scope.input[2].model;
      var y = $scope.input[3].model;


      var rateM = Math.log(rateM)

      $scope.output[0].model = (d + (s * 12)) * Math.pow((1 + r / 100), y);
    };
  }
]);