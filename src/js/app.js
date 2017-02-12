var app = angular.module('app', [
    'ui.bootstrap',
    'ngResource',
    'ngAnimate',
    'ngSanitize'
]);
app.controller('SearchController', ['$scope','$http', function ($scope, $http) {

    $scope.searchModel = '';
    $scope.loading = false;
    $scope.nodata = false;
 
    //search function
     $scope.searchClick = function () {
       $scope.loading = true;
         var searchResult = $scope.searchModel;
        $http({
            method: 'POST',
            url: '/api/tweets',
            data: "screen_name=" + searchResult,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(response){
            $scope.loading = false;
            $scope.tweetsRes = response.data.tweets;
           if($scope.tweetsRes.length == 0){
               $scope.nodata = true;
           }else {
               $scope.nodata = false;
           }
        });

    };
   
    //retweet and unretweet functions
    $scope.retweet = function (retweetId) {
        $http({
            method: 'POST',
            url: '/api/retweets/',
            data: JSON.stringify({id: retweetId})
        }).then(function(){
            $scope.searchClick();
        });

    };

    $scope.unretweet = function (tweetId) {
        $http({
            method: 'POST',
            url: '/api/unretweet/',
            data: JSON.stringify({id: tweetId})
        }).then(function(){
            $scope.searchClick();
        });
    };
    //verify if retweet is true then unretweet, if not retweet
    $scope.handleRetweet = function(retweetId, retweeted){
        if(retweeted)
            return $scope.unretweet(retweetId);
        return $scope.retweet(retweetId);
    };

    //add to favorite and delete from favorite functions
    $scope.favorite = function (favId) {
    
        $http({
            method: 'POST',
            url: '/api/favorites/',
            data: JSON.stringify({id: favId})
        }).then(function(){
            $scope.searchClick();
        });
    
    };
    
    $scope.unfav = function (favorId) {

        $http({
            method: 'POST',
            url: '/api/unfavorites/',
            data: JSON.stringify({id: favorId})
        }).then(function(){
            $scope.searchClick();
        });
    };

    //if tweet is favorited then unfav, if not then fav
    $scope.handleFovorite = function(favId, favorited){
        if(favorited)
            return $scope.unfav(favId);
        return $scope.favorite(favId);
    };

    //toggle function for hiding picture, socials and truncate text
    $scope.toggle = function (id) {
        angular.element('i.fa[data-chev="'+ id +'"]').toggleClass('toggleChevron');
        angular.element('.description[data-text="'+ id +'"]').toggleClass('truncate');
        angular.element('.block-body[data-id="'+ id +'"]').toggle();
    };



}]).filter('moment', function () {
    //filter for formating date
    return function (input, momentFn) {
        var args = Array.prototype.slice.call(arguments, 2),
            momentObj = moment(input);
        return momentObj[momentFn].apply(momentObj, args);
    };
});
app.directive('loading', function () {
    return {
        restrict : 'E',
        template : "<img class='loading-img' src='img/magnify.svg' alt='Loading' title='Loading'/>"
    }
});
app.directive('noData', function (){
    return {
        restrict: 'E',
        template: '<div class="nodata-error">Invalid username</div>'
    }
});