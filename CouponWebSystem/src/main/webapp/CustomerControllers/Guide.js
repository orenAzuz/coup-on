/**
 * 
 */

       
          (function(){
   var module = angular.module("customerApp");
   

   module.directive('guide',  function() {
	   return {
		   
		   	 scope:{
		   		guideInfo:'=',
		   	    
		   		alertMessage:'&'
		   	 },
		      restrict: 'AE',
		     
		      templateUrl: "CustomerHtmlFiles/CustomerInfo.html"
		  
  };
});
   
   })();