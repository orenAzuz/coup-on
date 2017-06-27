/**
 * 
 */


   
          (function(){
   var module = angular.module("customerApp");
   

   module.directive('messages',  function() {
	   return {
		   
		   	 scope:{
		   		success:'=',
		   		err:'=',
		   		info:'=',
		   		remove:'=',
		   		confirm:'&',
		   		alertMessage:'&'
		   	 },
		      restrict: 'AE',
		     
		      templateUrl: "Messages.html"
		  
  };
});
   
   })();