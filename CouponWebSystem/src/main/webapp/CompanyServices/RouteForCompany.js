/**
 * 
 */

	(function(){
	var module = angular.module("companyApp");

    module.controller("RouteCtor",RouteCtor);
	module.config(['$locationProvider', function($locationProvider) {
		
	  $locationProvider.hashPrefix('');
	}]);
		
		module.config(function($stateProvider , $urlRouterProvider) {
			
			var self = this;
			
			
			 $stateProvider
		
	.state("menue", {
		url : "/menue",
		templateUrl : "Carusela.html"
	})
	.state("CreateCoupon",{
		templateUrl : "CompanyHtmlFiles/createCoupon.html"
	})
	.state("myCouponCompany", {
		url : "/CompanyHtmlFiles/myCouponsCompany.html",
		templateUrl : "CompanyHtmlFiles/myCouponsCompany.html" 
		
	})
	.state("CouponBy", {
		templateUrl : "CompanyHtmlFiles/CouponBy.html" 
	})
	.state("CouponByID", {
		templateUrl : "CompanyHtmlFiles/CouponByID.html" 

	})
	.state("GetCompanyDetails", {
		templateUrl : "CompanyHtmlFiles/GetCompanyDetails.html" 
			
	})
	.state("GetCouponsByEndDate", {
		templateUrl : "CompanyHtmlFiles/GetCouponsByEndDate.html" 
			

    });
			    $urlRouterProvider.when("", "/menue");
});
	
function RouteCtor(){
	
}
 

   
   })();
