/**
 * 
 */

       
          (function(){
   var module = angular.module("companyApp");
   

   module.directive('guide',  function() {
	   return {
		   
		   	 scope:{
		   		guideInfo:'=',
		   	    
		   		alertMessage:'&'
		   	 },
		      restrict: 'AE',
		     
		      templateUrl: "CompanyHtmlFiles/CompanyInfo.html"
		  
  };
});
   
   })();