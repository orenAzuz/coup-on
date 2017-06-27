/**
 * 
 */
var dbg

(function(){

var module = angular.module("customerApp");
	
	module.controller("AllTheCouponsCtrl",AllTheCouponsCtor);

	 function AllTheCouponsCtor(CustomerServicesAPI,ErrorService)
	{
		 
		 var self = this;
		     self.divMode = false;
		 	self.successMessage = undefined;
			self.errorMessage = undefined;
			self.infoMessage = undefined;
			 self.couponData;
	
			

		  CustomerServicesAPI.GetAllCouponsInSystem()
			.then(function(data){
					self.coupons = data;
					
			},function(error)
	 		 {
				self.errorMessage = ErrorService.errorFunc(error);
					
					});	
			 
		  self.getCouponData = function(id) {
				
				for(var i=0; self.coupons.length > i ; i++){
					
					self.coupons[i ].endDate = new Date(self.coupons[i ].endDate);
					self.coupons[i ].startDate = new Date(self.coupons[i ].startDate);	
					
					if(self.coupons[i].id === id){
						
						self.couponData = self.coupons[i];
					}else{}
					
				}
			
				self.errorMessage = undefined;
				self.successMessage = undefined;
				self.divMode = true;
			
			}
		  
		  
		  
		  self.purchase = function(){
			  
			  if(self.couponData.startDate > new Date()){
				  
				  self.errorMessage = "Sorry but according to the start date of Coupon "+self.couponData.title+
				  " it is not available for purchase"
				  
			  }else{
		    	
		   	 var coupon = self.couponData;
			
		   	CustomerServicesAPI.purchaseCoupon(coupon).then(function(response)
		    		 {
			  		dbg = response;
			  		  console.log("success "+response.message);
			  		self.successMessage = response.message;
			  		
	 		 } ,function(error)
	 		 {
	 			self.errorMessage =	ErrorService.errorFunc(error);
	 		 });
		    }
		  }
		
		  self.alertMessage = function(){
				
				self.successMessage = undefined;
				self.errorMessage = undefined;
				self.infoMessage = undefined;
			}
		  
	
	
	}
})();

