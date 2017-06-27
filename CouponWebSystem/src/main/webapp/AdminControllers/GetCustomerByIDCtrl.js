/**
 * 
 */


      

(function(){

	var module = angular.module("adminApp");
	
	module.controller("GetCustomerByIDCtrl",GetCustomerByIDCtor);
	
	
	
	 function GetCustomerByIDCtor(AdminServicesAPI,ErrorService)
		{
		    var self = this;
			self.couponData;
			self.coupons;
			self.divMode = false;
			self.type;
			self.id;
			self.customerDiv = false;

			 self.alertMessage = function(){
					
					self.successMessage = undefined;
					self.errorMessage = undefined;
					self.deleteCustomerErrorMessage = undefined;
				}

		  
	this.getCustomerByID = function()
		  {
	      self.customerDiv = false;
	      self.alertMessage();
	      AdminServicesAPI.GetCustomerByID(self.id)
		  .then(function(data){
			  self.customer = data;
				self.coupons = self.customer.coupon;
				self.customerDiv = true;
				console.log(self.coupons);
				if(self.customer === null){
					
					self.infoMessage ="You may have entered an incorrect ID number. Please try again"
				}else{}
					
				},function(error)
		 		 {
		 				self.errorMessage = ErrorService.errorFunc(error);
		     });	  
		  }
	

    this.toggleUpdateMode = function(){
    	
    	self.updateMode =! self.updateMode
    }
    
    self.toggleCouponDivMode = function(){
		
		self.couponDivMode =! self.couponDivMode
		
	}
		  
		 this.getCouponData = function(index) {
				
				self.couponData = self.coupons[index];
			
				self.divMode = true;
				
			}
		 
		
		 this.updateCustomer = function(){
			
			 this.toggleUpdateMode();
			 var saveUpdate = self.customer;
			
			 AdminServicesAPI.updateCustomer(saveUpdate).then(function(response)
		    		 {
				 self.successMessage = response.message;
			  		  
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
		
		 var deleteCustomer = self.customer;
		 AdminServicesAPI.removeCustomer(deleteCustomer).then(function(response)
	    		 {
			 self.successMessage = response.message;
			 self.deleteCustomerErrorMessage = undefined;
			 self.customer = undefined;
			 self.customerDiv = false;
	    		 } ,function(error)
		 		 {
		 				self.errorMessage = ErrorService.errorFunc(error);
	    		 });
	    			 
	    		 }
		 
		 $('body').click(function(){
			  
			 if(self.couponDivMode==true){
				 
				 self.couponDivMode = false;
			 }else{}
			 
			});
		 
		 
		 
		 
		}
})();