/**
 * 
 */


(function(){
   var module = angular.module("companyApp");
   

   module.directive('infoMessage',  function() {
	   return {
		   
		   	 scope:{
		   		message:'=',
		   		alertMessage:'&'
		   	 },
		      restrict: 'AE',
		     
		      templateUrl: "InfoMessage.html"
		  
  };
});
       
       
          })();