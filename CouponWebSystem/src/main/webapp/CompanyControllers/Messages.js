/**
 * 
 */



          (function(){
   var module = angular.module("companyApp");
   

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