/**
 * Customer log out controller
 */


(function(){
	

	var module = angular.module("customerApp");
	
	module.controller("SginOutCtrl",SginOutCtot);

	 function SginOutCtot(CustomerServicesAPI)
	{
		 this.signOut = function(){
			 CustomerServicesAPI.signOut();
		 }
	}
	 
	 
})();