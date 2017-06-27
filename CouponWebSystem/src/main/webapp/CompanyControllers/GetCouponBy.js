/**
 * 
 */

(function(){

	var module = angular.module("companyApp");
	
	module.controller("GetCponByCtrl",GetCponByCtor);
	
	
	
	 function GetCponByCtor(CompanyServicesAPI,ErrorService)
		{
		    var self = this;
			self.couponData;
			self.coupons;
			self.divMode = false;
			self.type;
			self.id;

	self.getCouponByType = function()
		 {
		 self.divMode = false;
		 CompanyServicesAPI.GetCouponByType(self.type)
			.then(function(data){
					self.coupons = data;		
		
	       if(self.coupons[0] === undefined){
		     self.infoMessage ="Ther are no coupons for this type yet..."
		
	}
	else{
		
	}
	},function(error)
	 {
		self.errorMessage = ErrorService.errorFunc(error);
			});	
		 }	
		  
		 this.getCouponData = function(index) {
				
				self.coupons[index].endDate = new Date(self.coupons[index].endDate);
				self.coupons[index].startDate = new Date(self.coupons[index].startDate);
				self.couponData = self.coupons[index];
			
				
				self.divMode = true;
				
			}
		 
		 this.alertMessage = function(){
				
				self.successMessage = undefined;
				self.errorMessage = undefined;
				self.infoMessage = undefined;
				self.deleteCouponErrorMessage = undefined;
			}
		 
		
	 
	 this.toggleUpdateMode = function(){
	    	
	    	self.updateMode =! self.updateMode
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
	  		  console.log("response "+response.data.massage);
			 self.couponData = undefined;
			 self.deleteCouponErrorMessage = undefined;
			 self.getCouponByType();
			 
	 } ,function(error)
	 {
			self.errorMessage = ErrorService.errorFunc(error);
	 });
		 
		 
	 }
	 
	 self.validDate = function(){
		 
		 
		 
		 today = new Date();
	 
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
