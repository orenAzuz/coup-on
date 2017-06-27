/**
 * 
 */
     (function(){
    	 var module = angular.module("adminApp");
    		
    		module.controller("CreateCompanyCtrl",CreateCompanyCtor);
    		
    		Company = function (compName,password,email){
    			
    			this.compName = compName;
    			this.password = password;
    			this.email = email;
    			
    			
    		}
    		
    	
		
    		
    		 function	CreateCompanyCtor (AdminServicesAPI,ErrorService)
    		{
    			
    			var self = this;
    			
    		    self.alertMessage = function(){
    				
    				self.successMessage = undefined;
    				self.errorMessage = undefined;
    				self.deleteCompanyErrorMessage = undefined;
    			}
    			
    			self.company = new Company();
    			
    			this.createCompany = function(){
    			
    				
    				AdminServicesAPI.createCompany(self.company)
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
     
     