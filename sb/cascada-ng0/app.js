'use strict';

var app = angular.module("App", [
    'ui.bootstrap',
    'ui.router',
    'Register',
    'Yard',
    'Butt',
    'Spot',
    'Pond'
    ]);

app.constant('cfg', {
    setup: function(){
        var port = 3002;
        var url ='http://sitebuilt.net:'+port+'/api/'
        var appurl = 'http://73.249.62.27:8088'
        var prefix = 'casc_ng_';
        var toState = 'yard';
        return {
            port: port,
            url: url,
            prefix: prefix,
            toState: toState,
            appurl: appurl
        }
    },
    afterReg: function(user){
        console.log(user + ' is registered w/token')
    }
})

app.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider){
    $stateProvider.state('splash',{
        url:'/',
        template: '</br></br></br><h4>Splash</h4>'
    });
    $urlRouterProvider.otherwise('/');    
}])

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('OnlineInterceptor');
});

app.run(function($window, $rootScope){
  $rootScope.online=false;
  $rootScope.status=0;
})

app.factory('OnlineInterceptor', function($rootScope, $q){
        var Interceptor ={
            responseError: function(response){
                console.log(response)
                $rootScope.status = response.status;
                $rootScope.online = false;
                return $q.when(response);
            },
            response: function(response){
                if (response.config.url.substring(0,8)=='partials'){//hack
                    $rootScope.status = response.status;
                    $rootScope.online = false;                    
                }else{
                    $rootScope.status = response.status;
                    $rootScope.online = true;                    
                }
                //console.log('inter resp '+$rootScope.online+ response.status)
                return $q.when(response);           
            }
        };
        return Interceptor;
})