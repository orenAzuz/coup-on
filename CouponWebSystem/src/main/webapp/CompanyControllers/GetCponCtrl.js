/**
 * 
 */

(function(){
	

	var module = angular.module("companyApp");
	
	module.controller("GetCponCtrl",GetCponCtor);

	 function GetCponCtor(CompanyServicesAPI,ErrorService)
	{
      
		var self = this;
		self.divMode = false;
		self.updateMode = false;
		self.couponData;
		
		
		
		
		
		CompanyServicesAPI.GetCoupon()
		.then(function(data){
				self.arr = data;
				
				if(self.arr[0] === undefined){
					self.infoMessage ="Ther are no coupons yet..."
					
				}
				else{
					
				}
				},function(error)
				 {
			 		self.errorMessage = ErrorService.errorFunc(error);
		 		 });
			
		
		
		self.getCouponData = function(id) {
			
			for(var i=0; self.arr.length > i ; i++){
				
				self.arr[i ].endDate = new Date(self.arr[i ].endDate);
				self.arr[i ].startDate = new Date(self.arr[i ].startDate);	
				
				if(self.arr[i].id === id){
					
					self.couponData = self.arr[i];
				}else{}
				
			}
			
		
			
		
			self.errorMessage = undefined;
			self.successMessage = undefined;
			self.divMode = true;
		
		}

		 self.toggleDivMode = function(){
		    	
		    	self.divMode =! self.divMode
		    }
	    
	    this.toggleUpdateMode = function(){
	    	
	    	self.updateMode =! self.updateMode
	    }
	    
	    this.alertMessage = function(){
			
			self.successMessage = undefined;
			self.errorMessage = undefined;
			self.deleteCouponErrorMessage = undefined;
		}
	
	 
	 this.updateCoupon = function(){
		
		 this.toggleUpdateMode();
		 var saveUpdate = self.couponData;
		 CompanyServicesAPI.updateCoupon(saveUpdate).then(function(response)
	    		 {
		  		
		  		  self.successMessage = response.data.message;
 		 } ,function(error)
		 {
		 		self.errorMessage = ErrorService.errorFunc(error);
 		 });
	 }
	 
	 this.deleteCoupon = function()
	 {
		 self.deleteCouponErrorMessage = "Are you sure you want to continue deleting!"
	 }
	 
	 this.confirm = function(){
		 

		 var deleteCouopon = self.couponData;
		 CompanyServicesAPI.removeCoupon(deleteCouopon).then(function(response)
	    		 {
			 self.successMessage = response.data.message;
	  		  console.log("response "+response.data.message);
			 self.couponData = undefined;
			 self.deleteCouponErrorMessage = undefined;
			 CompanyServicesAPI.GetCoupon()
				.then(function(data){
						self.arr = data;
						});	
			 
	 },function(error)
	 {
	 		self.errorMessage = ErrorService.errorFunc(error);
	 });
		 
		 
	 }
	

	 self.validDate = function(){
		 
		 var today =0;
		 if(self.couponData.startDate< new Date()){
			 
			 today = new Date();
			 
		 }else{
			 
			 today=  self.couponData.startDate; 
		 }
		 
	        console.log(self.couponData.startDate)
	     
	        console.log(today.getFullYear())
	     var dd = today.getDate();
	     var mm = today.getMonth()+1; //January is 0!
	     var yyyy = today.getFullYear();
	     if(dd<10){
	         dd='0'+dd
	     } 
	     if(mm<10){
	    	 
	         mm='0'+mm
	     } 
	     if(dd<=24){
	    	 if(dd<5){
	    		 dd = today.getDate()+5;
		         dd='0'+dd
	    	 }else{
	    		 if(dd>=5 & dd<10){
  	    			 dd = today.getDate()+5;
  	    		 }else{
  	  	 dd = dd+5
  	    	 } 	    
	    	 }
	     }else{
	  	   if(mm<12){
	  		   mm=today.getMonth()+2
	  		   if(mm<10){
		               mm='0'+mm
		           } 
		               dd='06';
		         
	  		   
	  	   }else{
	  		   mm='01';
	  		   dd='06';
	  	   }
	  	  
	  	  
	     }

	     today = yyyy+'-'+mm+'-'+dd;
	     document.getElementById(self.couponData.title).setAttribute("min", today);
	     console.log(today)
		 }
	 
	 
	 
	 
	 }
	})();
	