/**
 * 
 */
(function(){
	
	var module = angular.module("customerApp");

    module.controller("RouteCtor",RouteCtor);
	module.config(['$locationProvider', function($locationProvider) {
	  $locationProvider.hashPrefix('');
	}]);

	module.config(function($stateProvider, $urlRouterProvider) {
	
	  $stateProvider
	    .state("main", {
	        url : "/main",
	    	templateUrl : "Carusela.html"
	        
	    })
	    
	    .state("allthecoupons",{
	    	url : "/allthecoupons",
	    	templateUrl : "CustomerHtmlFiles/AllTheCouponsInTheSystem.html",
	    	controller : "AllTheCouponsCtrl as all"
	    	
        })
	    
	    .state("mypurchasecoupons",{
	    	url : "/mypurchasecoupons",
	    	templateUrl : "CustomerHtmlFiles/MyPurchaseCoupons.html",
	    	controller : "MyPurchaseCouponsCtrl as my"
	    	
        })
	    
	    .state("getPurchasedCouponsByPrice",{
	    	url : "/getPurchasedCouponsByPrice",
	    	templateUrl : "CustomerHtmlFiles/GetPurchasedCouponsByPrice.html",
	    	controller : "GetPurchasedCouponsByPriceCtrl as get"
	    	
        })
	    
	    .state("getPurchasedCouponsByType",{
	    	url : "/getPurchasedCouponsByType",
	    	templateUrl : "CustomerHtmlFiles/GetPurchasedCouponsByType.html",
	    	controller : "GetPurchasedCouponsByTypeCtrl as get"
	    		
	    });
	    $urlRouterProvider.when("", "/allthecoupons");
});
   function RouteCtor (){
	   
	
	   
   }

})();