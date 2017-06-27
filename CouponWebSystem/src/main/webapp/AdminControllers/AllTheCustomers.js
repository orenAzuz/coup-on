/**
 * 
 */

    
       
       (function(){
    		

    		var module = angular.module("adminApp");
    		
    		module.controller("AllTheCustomersCtrl",AllTheCusromersCtor);

    		 function AllTheCusromersCtor(AdminServicesAPI,ErrorService)
    		{
    	      
    			var self = this;
    			self.customersDivMode = false;
    			self.updateMode = false;
    			self.customersData;
    			self.coupons;
    			self.couponData;
    			self.couponDivMode = false;
    			self.couponTrue = false;
    			
    			AdminServicesAPI.GetCustomers()
    			.then(function(data){
    					self.custData = data;
    					
    					if(self.custData===null){
    						
    						self.infoMessage ="Ther are no customers yet..."
    					}else{}
    						
    					},function(error)
    			 		 {
    						self.errorMessage = ErrorService.errorFunc(error);
    					
    					});	
    			
    			
    			this.getCustData = function(id) {
    				
    				for(var i=0; self.custData.length > i ; i++){
    					
    					if(self.custData[i].id === id){
    						
    						self.customersData = self.custData[i]
    						self.coupons =  self.custData[i].coupon;
    					}else{}
    					
    				}

    				
  
    				self.couponDivMode = false;
    				self.couponTrue = false;
    			}
    			
    			this.getCouponData = function(id){
    				
    				for(var i=0; self.coupons.length > i ; i++){
    					
    					if (self.coupons[i].id === id){
    						
    						self.couponData = self.coupons[i];
    						
    					}else{}
    					
    					if(self.coupons === null || self.coupons === undefined ){
        					
        					self.couponTrue = true;
        				}else{
        					self.couponTrue = false;
        				}
    				}
    				
    			
    				
    			}
    			self.toggleCouponDivMode = function(){
    				
    	    		
    				self.couponDivMode =! self.couponDivMode
    				
    			}
    				
  

    		    
    		    this.toggleUpdateMode = function(){
    		    	
    		    	self.updateMode =! self.updateMode
    		    }
    		    
    			self.toggleCouponDivMode = function(){
    				
    	    		
    				self.couponDivMode =! self.couponDivMode
    				
    			}
    			   this.alertMessage = function(){
       				
       				self.successMessage = undefined;
       				self.errorMessage = undefined;
       				self.deleteCustomerErrorMessage = undefined;
       			}
       		
    		
    		 
    		 this.updateCustomer = function(){
    			
    			 this.toggleUpdateMode();
    			 var saveUpdate = self.customersData;
    			 
    			 AdminServicesAPI.updateCustomer(saveUpdate).then(function(response)
    		    		 {
    				 self.successMessage = response.message;
    			  		  console.log("response "+response);
    	 		 } ,function(error)
    	 		 {
    					self.errorMessage = ErrorService.errorFunc(error);
    		     });
    		 }
    		 
    		 
    		 
    		 
    		 this.deleteCustomer = function()
    			 {
        			 console.log("delete!")
        			 self.deleteCustomerErrorMessage = "Are you sure you want to continue deleting!"
        		 }
        		 
        		 this.confirm = function(){
    			
    			 var deleteCustomer = self.customersData;
    			 AdminServicesAPI.removeCustomer(deleteCustomer).then(function(response)
    		    		 {
    				 self.successMessage = response.message;
    				 self.deleteCustomerErrorMessage = undefined;
    				 self.customersData = undefined;
    				 
    				 AdminServicesAPI.GetCustomers()
    	    			.then(function(data){
    	    					self.custData = data;
    	    					if(self.custData===null){		
    	    						self.infoMessage ="Ther are no customers yet..."
    	    					}else{}
    	    					},function(error)
    	    			 		 {
    	    						self.errorMessage = ErrorService.errorFunc(error);
    	    					});	
    				 
    				 
    				 
    				 
    				 
    		    		 } ,function(error)
    			 		 {
    		 				self.errorMessage = ErrorService.errorFunc(error);
    		    		 });
    				 
    				 AdminServicesAPI.GetCustomers()
    	    			.then(function(data){
    	    					self.custData = data;
    		    		 } ,function(error)
    			 		 {
    		 				self.errorMessage = ErrorService.errorFunc(error);
    		    		 });
    		    			 
    		    		
        		 }
    		    		 
    		  
    		   
    		    		 
        		 
    		 
    		 
    		 
    		 
    		 
    		 
    		 
    		 
    		 
        		 
    				 
    		} 
    		})();