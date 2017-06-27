/**
 * 
 */


  
    (function(){
    	
    	var module = angular.module("adminApp");
    	module.service("AdminServicesAPI",
    	
    			function($http){
    		
    		var self = this;
    		
    		self.GetCompanies = function () {
    			  
		    	var promise = $http.get("http://localhost:8080/CouponWebSystem/webapi/admin/allCompanies");
		    	var promise2 = promise.then(function(response){
								
								return response.data;
							});
		    	return promise2	
		       }
    		
    		
    		self.createCompany = function(company){
    			console.log(company);
    			var promise = $http.post( "http://localhost:8080/CouponWebSystem/webapi/admin/createCompany",company);
    			var promise2 = promise.then(function(response){
					
					return response.data;
				});
    			return promise2	
    	     }
    		
    		self.updateCompany = function(company){
    			
    		var promise = $http.put( "http://localhost:8080/CouponWebSystem/webapi/admin/updateCompany",company);
    		var promise2 = promise.then(function(response){
				
				return response.data;
			});
    		return promise2	
    			
    		}
    		
    		self.removeCompany = function(company){
    			
    			  var promise = $http.delete("http://localhost:8080/CouponWebSystem/webapi/admin/removeCompany/"+ company.compName);
            	 
            	  var promise2 = promise.then(function(response){
      				
    				  return response.data;
    			  });
    			  return promise2;
    		}
    		
    		self.GetCustomers = function(){
    			
    			var promise = $http.get("http://localhost:8080/CouponWebSystem/webapi/admin/customers");
		    	var promise2 = promise.then(function(response){
								
								return response.data;
							});
		    	return promise2	
    			
    		}
    		
    		self.updateCustomer = function(customer){
    			
    			var promise = $http.put( "http://localhost:8080/CouponWebSystem/webapi/admin/updateCustomer",customer);
    			var promise2 = promise.then(function(response){
					
					return response.data;
				});
    			return promise2	
        			
        		}
        		
        		self.removeCustomer = function(customer){
        			
        			  var promise = $http.delete("http://localhost:8080/CouponWebSystem/webapi/admin/removeCustomer/"+ customer.custName);
                	 
                	  var promise2 = promise.then(function(response){
          				
        				  return response.data;
        			  });
        			  return promise2;
        		}
        		
    		
    		self.createCustomer = function(customer){
    			
    			var promise =  $http.post( "http://localhost:8080/CouponWebSystem/webapi/admin/createCustomer",customer);
    			var promise2 = promise.then(function(response){
					
					return response.data;
				});
    			return promise2	
    		}
    		
    		 self.GetCustomerByID = function(id){
   			  
   			  
   			  var promise = $http.get("http://localhost:8080/CouponWebSystem/webapi/admin/customerById/"+id);
   			  var promise2 = promise.then(function(response){
   				
   				  return response.data;
   			  });
   			  return promise2;
   		  }
    		
    		 self.GetCompanyByID = function(id){
      			  
      			  
      			  var promise = $http.get("http://localhost:8080/CouponWebSystem/webapi/admin/companyById/"+id);
      			  var promise2 = promise.then(function(response){
      				
      				  return response.data;
      			  });
      			  return promise2;
      		  }
    		 
	 self.signOut = function(){
        		 
        		 var promise = $http.get("http://localhost:8080/CouponWebSystem/webapi/admin/signOut");
   		      var promise2 = promise.then(function(response){
   								
   								return response.data;
   							});
   		    	return promise2;		   
        		 
        		 
        		 
        	 }
    		 
    		
    		 
    		
    	}
    	
    	);
    })();