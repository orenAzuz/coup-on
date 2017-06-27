/**
 * 
 */
     
       
       
       (function(){
    		

    		var module = angular.module("adminApp");
    		
    		module.controller("AllTheCompaniesCtrl",AllTheCompaniesCtor);

    		 function AllTheCompaniesCtor(AdminServicesAPI,ErrorService)
    		{
    	      
    			var self = this;
    			self.companyDivMode = false;
    			self.updateMode = false;
    			self.companiesData;
    			self.coupons;
    			self.couponData;
    			self.couponDivMode = false;
    			self.couponTrue = false;
    			
    			
    			AdminServicesAPI.GetCompanies()
    			.then(function(data){
    					self.compData = data;
    					
    					if(self.compData===null){
    						
    						self.infoMessage ="Ther are no companies yet..."
    					}else{}
    						
    					},function(error)
    			 		 {
    						self.errorMessage = ErrorService.errorFunc(error);
    					
    					});	
    			
    			
    			this.getCompData = function(id) {
    				
    				for(var i=0; self.compData.length > i ; i++){
    					
    					if(self.compData[i].id === id){
    						
    						self.companiesData = self.compData[i]
    						self.coupons =  self.compData[i].coupons;
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
    					
    				}
    				
    			
    				
    			}
    				
    			self.toggleCouponDivMode = function(){
    				
    		
    				self.couponDivMode =! self.couponDivMode
    				if(self.coupons[0] === null || self.coupons[0]=== undefined ){
    					
    					self.couponTrue = !self.couponTrue;
    				}else{
    					self.couponTrue = false;
    				}
    			}
  

    		    
    		    this.toggleUpdateMode = function(){
    		    	
    		    	self.updateMode =! self.updateMode
    		    }
    		    
    		    
    		    this.alertMessage = function(){
    				
    				self.successMessage = undefined;
    				self.errorMessage = undefined;
    				self.deleteCompanyErrorMessage = undefined;
    				console.log("hiiii")
    			}
    		
    		 
    		 this.updateCompany = function(){
    			
    			 this.toggleUpdateMode();
    			 var saveUpdate = self.companiesData;
    			
    			 AdminServicesAPI.updateCompany(saveUpdate).then(function(response)
    		    		 {
    				 dbg = response;
    				 self.successMessage = response.message;
    			  		  console.log("response "+response);
    			  		  
    	 		 } ,function(error)
    	 		 {
    					self.errorMessage = ErrorService.errorFunc(error);
    	 		 });
    		 }
    		 
    		 
    		 this.deleteCompany = function()
    		 {
    			 console.log("delete!")
    			 self.deleteCompanyErrorMessage = "Are you sure you want to continue deleting!"
    		 }
    		 
    		 this.confirm = function(){
    			
    			 var deleteCompany = self.companiesData;
    			 AdminServicesAPI.removeCompany(deleteCompany).then(function(response)
    		    		 {
    				 self.successMessage = response.message;
    				 self.companiesData = undefined;
    				 self.deleteCompanyErrorMessage = undefined;
    				 AdminServicesAPI.GetCompanies()
    	    			.then(function(data){
    	    					self.compData = data;});
    				 
    		 
    		  		
    		 } ,function(error)
	 		 {
 				self.errorMessage = ErrorService.errorFunc(error);
    		 });
    			 
    		 }
    		 
  
    		 
    		 
    		 }
    		})();
       