/**
 * 
 */

   (function(){
	   
	   var module = angular.module("customerApp");

		  module.service("CustomerServicesAPI",function($http){
			  
			  var self = this;  
			  
		       self.GetAllCouponsInSystem = function () {
		  
		    	var promise = $http.get("http://localhost:8080/CouponWebSystem/webapi/customer/allTheCouponsInTheSystem");
		    	var promise2 = promise.then(function(response){
								
								return response.data;
							});
		    	return promise2	
		       }
		    	
		    	self.MyPurchaseCoupons = function(){

		    		var promise = $http.get("http://localhost:8080/CouponWebSystem/webapi/customer/coupons");
			    	var promise2 = promise.then(function(response){
									
									return response.data;
								});
			    	return promise2	
			       }
		    	
		    	self.purchaseCoupon = function(coupon){
		    		
		    		var promise =  $http.put("http://localhost:8080/CouponWebSystem/webapi/customer/purchaseCoupon/"+
		    				coupon.title);
		    		var promise2 = promise.then(function(response){
						
						return response.data;
					});
		    		return promise2	
		    	}
		    	
		    	self.GetCouponByType = function(type){
		    		
		    		var promise = $http.get("http://localhost:8080/CouponWebSystem/webapi/customer/getPurchasedCouponsByType/"+
		    				type);
			    	var promise2 = promise.then(function(response){
									
									return response.data;
								});
			    	return promise2	
			       }
		    	
		    	self.getCouponByPrice = function(price){
		    		
		    		var promise = $http.get("http://localhost:8080/CouponWebSystem/webapi/customer/getPurchasedCouponsByPrice/"+
		    				price);
			    	var promise2 = promise.then(function(response){
									
									return response.data;
								});
			    	return promise2	
		    		
		    		
		    	}
		    	
				
		    	self.getName = function(){
		        	  
		        	  var promise = $http.get("http://localhost:8080/CouponWebSystem/webapi/customer/name");
				      var promise2 = promise.then(function(response){
										
										return response.data;
									});
				    	return promise2;		  
	    		 }
		    	 self.signOut = function(){
	        		 
	        		 var promise = $http.get("http://localhost:8080/CouponWebSystem/webapi/customer/signOut");
	   		      var promise2 = promise.then(function(response){
	   								
	   								return response.data;
	   							});
	   		    	return promise2;		   
	        		 
	        		 
	        		 
	        	 }
		 
				  
    
    
    
    
    
    
		  });
       })();