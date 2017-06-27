/**
 * 
 */

       
          (function(){
   var module = angular.module("adminApp");
   

   module.directive('guide',  function() {
	   return {
		   
		   	 scope:{
		   		guideInfo:'=',
		   	    
		   		alertMessage:'&'
		   	 },
		      restrict: 'AE',
		     
		      templateUrl: "AdminHtmlFiles/AdminInfo.html"
		  
  };
});
   
   })();