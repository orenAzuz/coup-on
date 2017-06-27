/**
 * 
 */

      (function(){

	var module = angular.module("customerApp");
	
	module.controller("GetPurchasedCouponsByTypeCtrl",GetPurchasedCouponsByTypeCtor);
	
	
	
	 function GetPurchasedCouponsByTypeCtor(CustomerServicesAPI,ErrorService)
		{
		    var self = this;
			self.couponData;
			self.coupons;
			self.divMode = false;
			self.type;
			

	this.getCouponByType = function()
		 {
		self.alertMessage();
		self.divMode = false;
		CustomerServicesAPI.GetCouponByType(self.type)
			.then(function(data){
					self.coupons = data;		
		
		console.log(self.coupons)
		if(self.coupons[0] === undefined || self.coupons[0] === null){
			self.infoMessage ="Ther are no coupons for this type yet..."
			
		}
		else{
			
		}
		},function(error)
		 {
	 		self.errorMessage = ErrorService.errorFunc(error);
			
 		});	
		 }
		  
		
		
	 self.getCouponData = function(id) {
			
			for(var i=0; self.coupons.length > i ; i++){
				
				self.coupons[i ].endDate = new Date(self.coupons[i ].endDate);
				self.coupons[i ].startDate = new Date(self.coupons[i ].startDate);	
				
				if(self.coupons[i].id === id){
					
					self.couponData = self.coupons[i];
				}else{}
				
			}
			self.infoMessage = undefined;
			self.errorMessage = undefined;
			self.successMessage = undefined;
			self.divMode = true;
		
		}
	 self.alertMessage = function(){
			
			self.successMessage = undefined;
			self.errorMessage = undefined;
			self.infoMessage = undefined;
		}
	  
	  

		 
		 
		}
})();