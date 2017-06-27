/**
 * This is an error service for company application
 */


(function(){
    	
    	var module = angular.module("companyApp");
    	module.service("ErrorService",function(){
    			
    		this.errorFunc =	function(error){
    		
    		if(error.data === null){
				 
 				return "A connection refused error has occurred. Please try again  or" +
					" re-sign in the system";
 			 }else{
 				return error.data.message;  
 			 }
    		}
    	})
    			
    			
    			
})();