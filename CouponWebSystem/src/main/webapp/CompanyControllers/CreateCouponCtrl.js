/**
 * 
 */


   (function(){
   var module = angular.module("companyApp");
   
   
	
	module.controller("CreateCouponCtrl",CreateCouponCtor);
	
	function CreateCouponCtor(CreateCouponServiceAPI,ErrorService)
	{
		var self = this;

	
		self.startDate = new Date();
		self.endDate = new Date();
    StartDateFunc = function(){
    	
		this.startDate =  new Date(Date.UTC(self.startDate.getFullYear(), self.startDate.getMonth(),
				self.startDate.getDate(), self.startDate.getHours(), self.startDate.getMinutes(), self.startDate.getSeconds()));
	
	}
    
    
	
	EndDateFunc = function(){
		
		this.endDate = new Date(Date.UTC(self.endDate.getFullYear(), self.endDate.getMonth(),
				self.endDate.getDate(), self.endDate.getHours(), self.endDate.getMinutes(), self.endDate.getSeconds()));
	}
	
	self.startDateFunc = new StartDateFunc();
    self.endDateFunc = new EndDateFunc(); 
    
       
    
       
    
    
	CouponToSend = function(title,amount,type,price,image,massage){
		

			    	this.title = title;
			  		this.startDate = self.startDateFunc.startDate;
			  		this.endDate =   self.endDateFunc.endDate;
			  		this.amount = amount;
			  		this.type = type;
			  		this.price = price;
			  		this.image = image;
			  	    this.massage = massage;

		
	}

	self.couponToSend = new CouponToSend();
	
	
		this.alertMessage = function(){
			
			self.successMessage = undefined;
			self.errorMessage = undefined;
		}
		
	
		  this.create = function ()
		  {
	  

			    var filesSelected = document.getElementById("inputFileToLoad").files;
			    if (filesSelected.length > 0) {
			      var fileToLoad = filesSelected[0];

			      var fileReader = new FileReader();

			      fileReader.onload = function(fileLoadedEvent) {
			    	  self.couponToSend.image = fileLoadedEvent.target.result;
			    	  console.log(self.couponToSend.endDate)// <--- data: base64
			   
			  CreateCouponServiceAPI.createCoupon(self.couponToSend)
			  	.then(function(response)
	    		 {
			  		
			  		self.successMessage = response.message;
	    		 } ,function(error)
		 		 {
						self.errorMessage = ErrorService.errorFunc(error);
	    			
	    		 });
			
		        }
			      }
			   fileReader.readAsDataURL(fileToLoad);
			
	
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
	       document.getElementById("datefield").setAttribute("min", today);
	       
	       
	       $(document).ready(function(){
	    	    $('#datefield').change(function(){
	    	                
	    	       
	    	
	    	            console.log(new Date(this.value))
	      
	      var edate = new Date(this.value);
	    
	      var dd = edate.getDate();
	       var mm = edate.getMonth()+1; 
	       var yyyy = edate.getFullYear();
	        if(dd<10){
	               dd='0'+dd
	           } 
	           if(mm<10){
	               mm='0'+mm
	           } 
	           if(dd<=24){
	        	   if(dd<5){
	  	    		 dd = edate.getDate()+5;
	  		         dd='0'+dd
	  	    	 }else{
	  	    		 if(dd>=5 & dd<10){
	  	    			 dd = edate.getDate()+5;
	  	    		 }else{
	  	  	 dd = dd+5
	  	    	 }
	  	    	 }
	           }else{
	        	   if(mm<12){
	        		   mm=edate.getMonth()+2
	        		   if(mm<10){
	    	               mm='0'+mm
	    	           } 
	    	               dd='06';
	    	         
	        		   
	        	   }else{
	        		   mm='01';
	        		   dd='06';
	        	   }
	        	  
	        	  
	           }
	           
	           edate = yyyy+'-'+mm+'-'+dd;
	           document.getElementById("endDatefield").setAttribute("min", edate);
	    	    });
	    	});
	       
	       
	       

		      var edate = new Date();
		    
		      var dd = edate.getDate();
		       var mm = edate.getMonth()+1; 
		       var yyyy = edate.getFullYear();
		        if(dd<10){
		               dd='0'+dd
		           } 
		           if(mm<10){
		               mm='0'+mm
		           } 
		           if(dd<=24){
		        	   if(dd<5){
			  	    		 dd = edate.getDate()+5;
			  		         dd='0'+dd
			  	    	 }else{
			  	    		 if(dd>=5 & dd<10){
			  	    			 dd = edate.getDate()+5;
			  	    		 }else{
			  	  	 dd = dd+5
			  	    	 }
			  	    	 }
		           }else{
		        	   if(mm<12){
		        		   mm=edate.getMonth()+2
		        		   if(mm<10){
		    	               mm='0'+mm
		    	           } 
		    	               dd='05';
		    	         
		        		   
		        	   }else{
		        		   mm='01';
		        		   dd='05';
		        	   }
		        	  
		        	  
		           }
		           
		           edate = yyyy+'-'+mm+'-'+dd;
		           document.getElementById("endDatefield").setAttribute("min", edate);
	       
	       
	       
	       
	       
	       
	 
	}

   })();