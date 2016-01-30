var Yard = angular.module('Yard', []);

Yard.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider){
	$stateProvider.state('yard',{
		url:'/yard',
		template: '<Yard></Yard>'
	});
	$urlRouterProvider.otherwise('/yard');    
}])

Yard.directive('yard', ['YardService', 'cfg', '$q', '$window', function(YardService, cfg, $q, $window){
	return{
		restrict: 'E',
		scope: {}, 
		templateUrl: "modules/yard/yard.html",
		controller: function(){

		},
		controllerAs: 'YardCtrl',
		link: function(scope, element, attrs){
			var inyard=true
			scope.data = YardService.data;
			scope.cat ='mabibi'
			scope.dog ='uli'
			console.log('in yard')
			var sse = YardService.startSSE(scope);
			scope.$on("$destroy",function(){
				console.log('left the yard');
				inyard=false
				sse.close();
			});
			$window.onblur = function(){
				console.log('window blurred')
				sse.close();
			};
			$window.onfocus=function(){
				console.log('window focused')
				//if (inyard){sse= startSSE();}
				if (inyard){sse= YardService.startSSE(scope);}
			};
			scope.handleUserInput =function(){
				//console.log(newspot)
				sse.close();
				console.log(JSON.stringify(scope.data.spots))
				console.log('got user input');
				YardService.send2server(scope.data.spots)
			}			
		}		
	}
}])

Yard.factory('YardService',['cfg', '$http', function(cfg, $http){
	var url =cfg.setup().appurl;
	console.log('factory loaded')
	var data= {spots:{dog:'uli'}}
	var getSpots = function(callback){
		console.log(url+'/report/')
		$http.get(url+'/report/').
		success(function(data,status){
			callback(data);
		}).error(function(data, status){
			callback(data);
		});	
		console.log(data)	
	}
	getSpots(function(newdata){
		angular.copy(newdata, data);
		console.log(data.spots)
	});
	return{
		data: data,
		dog:'uli',
		url:url,
		getSpots: getSpots,
		startSSE: function(scope){
			var sse = new EventSource(url+'/my_event_source');
			sse.onmessage = function(message) {
		    	var sseData = JSON.parse(message.data).data;
		    	this.data={spots:sseData};
		    	scope.data = this.data;
		    	scope.$apply()
		    	console.log(this.data.spots)
		    }
		    return sse;
		},
		setSpot: function(newspot){
			console.log(newspot)
			console.log(spots)
			//spots[newspot.spot]=newspot
			console.log(JSON.stringify(spots.spots[newspot.spot]))
		},
		send2server: function(data){
			console.log(JSON.stringify(data))
			console.log('server sending data')
		}
	}
}])