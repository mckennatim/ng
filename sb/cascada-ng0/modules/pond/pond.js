var Pond = angular.module('Pond', []);

Pond.directive('pond', ['PondService', 'cfg', function(PondService, cfg){
	return{
		restrict: 'E',
		scope: {
			aspot:'=',
			sendSpot: '&'
		}, 
		templateUrl: "modules/pond/pond.html",
		controller: function(){
		},
		controllerAs: 'pondCtrl',
		link: function(scope, element, attrs){
			scope.okClick= function(){
				console.log('handleClick transferred here')
				var newspot = {"tleft":60,"nexton":0,"spot":"pond","state":"timer"};
				scope.aspot = newspot;
				
				scope.sendSpot();
			};

		}		
	}
}])

Pond.factory('PondService',['cfg',function(cfg){
	var lsus = cfg.setup().prefix+'pond';
	var lal = JSON.parse(localStorage.getItem(lsus)) || {activeList:''};
	return{
		dog:'uli'
	}
}])