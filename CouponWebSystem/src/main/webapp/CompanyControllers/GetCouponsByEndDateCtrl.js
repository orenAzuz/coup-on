/**
 * 
 */

       
(function(){

	var module = angular.module("companyApp");
	
	module.controller("GetCouponsByEndDateCtrl",GetCouponsByEndDateCtor);
	
	

	var stringDate = new Date();
	
	DateTemp = function(){
		
		this.stringDate =  new Date(Date.UTC(stringDate.getFullYear(), stringDate.getMonth(),
				stringDate.getDate(), stringDate.getHours(), stringDate.getMinutes(), stringDate.getSeconds()));
	
	}
	
	
	 function GetCouponsByEndDateCtor(CompanyServicesAPI,ErrorService)
		{
		    var self = this;
			self.couponData;
			self.coupons;
			self.divMode = false;
			self.type;
			self.infoMessage = undefined;
			self.successMessage = undefined;
			self.errorMessage = undefined;
			
     
		
	  self.dateToSend = new DateTemp();
	  
		  
	self.getCouponByEndDate = function()
		  {
		self.infoMessage = undefined;
		self.coupons = undefined;
	      self.divMode = false;
		  CompanyServicesAPI.GetCouponByEndDate(self.dateToSend)
		  .then(function(data){
				self.coupons = data;
				 if(self.coupons[0] === undefined || self.coupons === undefined || self.coupons === null){
				     self.infoMessage ="No coupons found based on this expiration date..."
				console.log(self.infoMessage)
				
			}
		     },function(error)
			 {
		 		self.errorMessage = ErrorService.errorFunc(error);
		     });	  
		  }
	
	
	 this.alertMessage = function(){
			
			self.successMessage = undefined;
			self.errorMessage = undefined;
			self.infoMessage = undefined;
			self.deleteCouponErrorMessage = undefined;
		}
	 
	
	
	self.getCouponData = function(id) {
		
		for(var i=0; self.coupons.length > i ; i++){
			
			self.coupons[i ].endDate = new Date(self.coupons[i ].endDate);
			self.coupons[i ].startDate = new Date(self.coupons[i ].startDate);	
			
			if(self.coupons[i].id === id){
				
				self.couponData = self.coupons[i];
			}else{}
			
			
			
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
		  		  console.log("response "+response.data.message);
				 self.couponData = undefined;
				 self.deleteCouponErrorMessage = undefined;
				 self.getCouponByEndDate();
				 
		 } ,function(error)
		 {
				self.errorMessage = ErrorService.errorFunc(error);
		 });
			 
			 
		 }
			    
			    this.alertMessage = function(){
					
					self.successMessage = undefined;
					self.errorMessage = undefined;
					self.deleteCouponErrorMessage = undefined;
					
				}
			
		   
		 }
	 
	 

	 var today = new Date();
	
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 
  

    today = yyyy+'-'+mm+'-'+dd;
    document.getElementById("inputDatefield").setAttribute("min",today );
    console.log(today) 
	
	
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

