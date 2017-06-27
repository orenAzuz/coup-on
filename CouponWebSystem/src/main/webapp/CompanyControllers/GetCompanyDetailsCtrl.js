/**
 * 
 */
  
    
(function(){
	

	var module = angular.module("companyApp");
	
	module.controller("GetCompanyDetailsCtrl",GetCompanyDetailsCtor);
	
	
	 function GetCompanyDetailsCtor(CompanyServicesAPI,ErrorService)
		{
         var self = this;
        

         self.errorMessage = undefined;
         
         
			CompanyServicesAPI.GetCompanyDetails()
			.then(function(data){

                    self.company = data;
			}
			 ,function(error)
			 {
					self.errorMessage = ErrorService.errorFunc(error);
    		 });
		
         
			
   
     
     
}
})();