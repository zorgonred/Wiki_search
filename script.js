'use strict';
var wikiSearchModule = angular.module('myApp', [])
    .controller('wikiSearch', function ($scope, $http) {


        function ngOnit() {
            $scope.searchPhrase = "Cars";
            $scope.entries = [];
            $scope.loadingSearch = false;
            $scope.searchError = false;
        }

        ngOnit();


        $scope.getSearchResultFromWikipedia = (search) => {
            $scope.loadingSearch = true;
            $scope.entries = [];

            $http({
                method: 'GET',
                url: 'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=' + search + '&srlimit=10',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(
                function successCallback(response) {
                    console.log('SUCCESS :-) ' + angular.toJson(response.data));
                    $scope.loadingSearch = false;

                    $scope.entries = response.data.query.search;


                },
                function errorCallback(response) {
                    console.log('FAILED :-( ' + response.status);
                    $scope.loadingSearch = false;
                    $scope.searchError = true;
                });


        }

        $scope.replaceFirstOccurrence = (replacement) => {

            const firstOccurrence = document.querySelectorAll('span.searchmatch');
            firstOccurrence[0].innerHTML = replacement;


        }

        $scope.replaceAll = (replacement) => {
            const allOccurrence = document.querySelectorAll('span.searchmatch');

            allOccurrence.forEach(occurrence => occurrence.innerHTML = replacement);
            console.log($scope.entries)

        }

    });

//Filter to read HTML String
wikiSearchModule.filter('trusted', function ($sce) {
    return function (html) {
        return $sce.trustAsHtml(html)
    }
})


