/**
 * 
 */

      (function(){
    	 var module = angular.module("adminApp");
    		
    		module.controller("CreateCustomerCtrl",CreateCustomerCtor);
    		
    		Customer = function (custName,password){
    			
    			this.custName = custName;
    			this.password = password;
    	
    			
    			
    		} 
    		
    		 function	CreateCustomerCtor (AdminServicesAPI,ErrorService)
    		{
    			
    			var self = this;
    			
    			   this.alertMessage = function(){
          				
          				self.successMessage = undefined;
          				self.errorMessage = undefined;
          				self.deleteCompanyErrorMessage = undefined;
          			}
          		
    			
    			self.customer = new Customer();
    			
    			this.createCusrtomer = function(){
    				
    				
    				AdminServicesAPI.createCustomer(self.customer)
    				.then(function(response)
    			    		 {
    					  		
    					self.successMessage = response.message;
    			    		 } ,function(error)
        			 		 {
 	    		 				self.errorMessage = ErrorService.errorFunc(error);
    			    		 });
    				
    			}
    		}
    	 
    	 
     })();
     