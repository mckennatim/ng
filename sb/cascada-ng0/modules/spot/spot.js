var Spot = angular.module('Spot', []);


Spot.directive('spot', ['SpotService', 'cfg', function(SpotService, cfg){
	return{
		restrict: 'E',
		scope: {
			aspot:'=', 
			danimal:'='
		}, 
		templateUrl: "modules/spot/spot.html",
		controller: function(){
		},
		controllerAs: 'SpotCtrl',
		link: function(scope, element, attrs){
			scope.dog='butler'
		}		
	}
}])

Spot.factory('SpotService',['cfg', function(cfg){
	return{
		dog:'uli'
	}
}])