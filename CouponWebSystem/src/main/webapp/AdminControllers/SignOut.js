/**
 * Admin Sign out controller
 */


(function(){
	

	var module = angular.module("adminApp");
	
	module.controller("SginOutCtrl",SginOutCtot);

	 function SginOutCtot(AdminServicesAPI)
	{
		 this.signOut = function(){
			 AdminServicesAPI.signOut();
		 }
	}
	 
	 
})();