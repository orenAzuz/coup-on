/**
 * 
 */


         

(function(){

	var module = angular.module("adminApp");
	
	module.controller("GetCompanyByIDCtrl",GetCompanyByIDCtor);
	
	
	
	 function GetCompanyByIDCtor(AdminServicesAPI,ErrorService)
		{
		    var self = this;
			self.couponData;
			self.coupons;
			self.divMode = false;
			self.type;
			self.id;
			self.companyDiv = false;
			self.couponDivMode = false;

			  self.alertMessage = function(){
					
					self.successMessage = undefined;
					self.errorMessage = undefined;
					self.deleteCompanyErrorMessage = undefined;
				}
		  
	this.getCompanyByID = function()
		  {
	      self.companyDiv = false;
	     self.alertMessage();
	      AdminServicesAPI.GetCompanyByID(self.id)
		  .then(function(data)
			{
			  self.company = data;
				self.coupons = self.company.coupons;
				self.companyDiv = true;
				console.log(self.coupons);
				if(self.company === null || self.company === undefined){
					
					self.infoMessage ="You may have entered an incorrect ID number. Please try again"
				}else{}
					
				},function(error)
		 		 {
 		 				self.errorMessage = ErrorService.errorFunc(error);
				
		     });	  
		  }
		  
		 this.getCouponData = function(index) {
				
				self.couponData = self.coupons[index];
			
				self.divMode = true;
				
			}
		 
		


		    
		    this.toggleUpdateMode = function(){
		    	
		    	self.updateMode =! self.updateMode
		    }
		
		    self.toggleCouponDivMode = function(){
				
				self.couponDivMode =! self.couponDivMode
				
			}
		 
		 this.updateCompany = function(){
			
			 this.toggleUpdateMode();
			 var saveUpdate = self.company;
			
			 AdminServicesAPI.updateCompany(saveUpdate).then(function(response)
		    		 {
				 self.successMessage = response.message;
			  		  console.log("response "+response);
	 		 } ,function(error)
	 		 {
	 				self.errorMessage = ErrorService.errorFunc(error);
	 		 });
		 }
		 
		 this.deleteCompany = function()
		 {
			 console.log("delete!")
			 self.deleteCompanyErrorMessage = "Are you sure you want to continue deleting!"
		 }
		 
		 this.confirm = function(){
			
			 var deleteCompany = self.company;
			 AdminServicesAPI.removeCompany(deleteCompany).then(function(response)
		    		 {
				 self.successMessage = response.message;
				 self.companyDiv = false;
				 self.company = undefined;
				 self.deleteCompanyErrorMessage = undefined;
				 
				 
		 
		  		
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