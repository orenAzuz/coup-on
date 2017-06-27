/**
 * 
 */
 
 
 

 (function(){

 var module = angular.module("customerApp");
 	
 	module.controller("MyPurchaseCouponsCtrl",MyPurchaseCouponsCtor);

 	 function MyPurchaseCouponsCtor(CustomerServicesAPI,ErrorService)
 	{
 		 
 		 var self = this;
 		     self.divMode = false;
 			
 			 self.couponData;
 			

 		  CustomerServicesAPI.MyPurchaseCoupons()
 			.then(function(data){
 					self.coupons = data;
 							if(self.coupons[0] === undefined){
 						self.infoMessage ="Ther are no coupons yet..."
 							
 					}
 					else{
 						
 					}
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
