/**
 * 
 */

    (function(){
	
	var module = angular.module("adminApp");

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
	    .state("CreateCompany",{
	    	url : "/CreateCompany",
	    	templateUrl : "AdminHtmlFiles/CreateCompany.html",
	    	controller : "CreateCompanyCtrl as ctrl"
	    		  
	    })
	    .state("AllTheCompanies",{
	    	url : "/AllTheCompanies",
	    	templateUrl : "AdminHtmlFiles/AllTheCompanies.html",
	    	controller : "AllTheCompaniesCtrl as ctrl"
	    	
	    })
	    .state("AllTheCustomers",{
	    	url : "/AllTheCustomers",
	    	templateUrl : "AdminHtmlFiles/AllTheCustomers.html",
	    	controller : "AllTheCustomersCtrl as ctrl"
	    		
	    })
	    .state("CreateCustomer",{
	    	url : "/CreateCustomer",
	    	templateUrl : "AdminHtmlFiles/CreateCustomer.html",
	    	controller : "CreateCustomerCtrl as ctrl"
	    		
	    })
	    .state("GetCustomerByID",{
	    	url : "/GetCustomerByID",
	    	templateUrl : "AdminHtmlFiles/GetCustomerByID.html",
	    	controller : "GetCustomerByIDCtrl as ctrl"
	    		
	    })
	    .state("GetCompanyByID",{
	    	url : "/GetCompanyByID",
	    	templateUrl : "AdminHtmlFiles/GetCompanyByID.html",
	    	controller : "GetCompanyByIDCtrl as ctrl"
	    		
	    	    });
	    $urlRouterProvider.when("", "/main");
});
   function RouteCtor (){
	   
   }

})();
	    
	    
	    
	    