const App = angular.module("App", []);

App.controller("AppController", [
  "$scope",
  ($scope) => {

    /**
     * @param {Number} number
     * @param {Integer} round 
     * @returns {Number} number to certain decimal point
     */
    const rounding = (number, round) => {
      let dr = Math.pow(10, round);

      return Math.round(number * dr) / dr;
    };

    /**
     * @param {Number} result of exponentiation
     * @param {Number} exponent 
     * @returns {Number} base of exponentiation
     */
    const getBase = (result, exponent) => {

      let value = Math.pow(result, 1 / exponent);

      return rounding(value, 2);
    };

    // Model of input
    $scope.input = [{
        label: "Current deposit",
        title: "Basic",
        suffix: undefined,
      },
      {
        label: "Monthly save",
        suffix: undefined,
      }, {
        label: "Annual interest rate",
        title: "Interest rate",
        suffix: "%",
        onChange() {
          $scope.input[3].model = rounding(this.model / 12, 3);
          $scope.input[4].model = rounding(this.model / 365, 3);
        }
      }, {
        label: "Monthly interest rate",
        suffix: "%",
        onChange() {
          $scope.input[2].model = rounding(this.model * 12, 3);
          $scope.input[4].model = rounding(this.model / 12, 3);
        }
      }, {
        label: "Daily interest rate",
        suffix: "%",
        onChange() {
          $scope.input[2].model = rounding(this.model * 365, 3);
          $scope.input[3].model = rounding(this.model * 12, 3);
        }
      }, {
        label: "For how many",
        title: "Duration",
        suffix: "Years",
        onChange() {
          $scope.input[6].model = rounding(this.model * 12, 0);
          $scope.input[7].model = rounding(this.model * 365, 0);
        }
      }, {
        label: "For how many",
        suffix: "months",
        onChange() {
          $scope.input[5].model = rounding(this.model / 12, 0);
          $scope.input[7].model = rounding(this.model * 30.41, 0);
        }
      }, {
        label: "For how many",
        suffix: "days",
        onChange() {
          $scope.input[5].model = rounding(this.model / 365, 0);
          $scope.input[6].model = rounding(this.model / 30.41, 0);
        }
      }
    ];

    // Model of output
    $scope.output = [{
      label: "Final deposit",
    }, {
      label: "Total interest",
    }];

    $scope.calculate = () => {
      let d = $scope.input[0].model; // deposit
      let s = $scope.input[1].model; // monthly save
      let r = $scope.input[3].model; // monthly rate
      let l = $scope.input[6].model; // how many month

      for (let i = 0; i < l; i++) {
        d = d * (1 + r / 100) + s;
      }

      $scope.output[0].model = rounding(d, 2);
      $scope.output[1].model = rounding(d - s * l - $scope.input[0].model, 2);
    };
  }
]);