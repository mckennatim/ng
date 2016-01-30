var Butt = angular.module('Butt', []);


Butt.directive('butt', ['ButtService', 'cfg', 'YardService', function(ButtService, cfg, YardService){
	return{
		restrict: 'E',
		scope: {
			handleClick:'&'
		}, 
		templateUrl: "modules/butt/butt.html",
		controller: function(){
		},
		controllerAs: 'ButtCtrl',
		link: function(scope, element, attrs){
			console.log('in butt')
		}		
	}
}])

Butt.factory('ButtService',['cfg', function(cfg){
	var lsus = cfg.setup().prefix+'butt';
	var lal = JSON.parse(localStorage.getItem(lsus)) || {activeButt:''};
	return{
		dog:'uli',
	}
}])