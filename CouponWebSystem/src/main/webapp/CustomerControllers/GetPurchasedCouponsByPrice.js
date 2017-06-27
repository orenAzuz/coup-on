/**
 * 
 */


    (function(){

	var module = angular.module("customerApp");
	
	module.controller("GetPurchasedCouponsByPriceCtrl",GetPurchasedCouponsByPriceCtor);
	
	
	
	 function GetPurchasedCouponsByPriceCtor(CustomerServicesAPI,ErrorService)
		{
		    var self = this;
			self.couponData;
			self.coupons;
			self.divMode = false;
			self.type;
			self.price;
			self.successMessage = undefined;
			self.errorMessage = undefined;
			self.infoMessage = undefined;
			
			
			
			 self.alertMessage = function(){
					
					self.successMessage = undefined;
					self.errorMessage = undefined;
					self.infoMessage = undefined;
				}
		  
	this.getCouponByPrice = function()
		  {
		self.alertMessage();
		self.divMode = false;
		CustomerServicesAPI.getCouponByPrice(self.price)
		  .then(function(data){
				self.coupons = data;
				console.log(self.coupons);
				if(self.coupons[0] === undefined || self.coupons[0] === null){
					self.infoMessage ="Ther are no coupons for this price yet...";
				}else{}
					
				
		  },function(error)
	 		 
	 		 {
			  self.errorMessage =	ErrorService.errorFunc(error);
		     });	  
		  }
		  
		 this.getCouponData = function(index) {
				
				self.couponData = self.coupons[index];
				
				self.divMode = true;
				
			}
		
		 
		 
		}
})();