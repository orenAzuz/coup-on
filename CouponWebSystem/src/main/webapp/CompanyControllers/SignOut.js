/**
 * 
 */


(function(){
	

	var module = angular.module("companyApp");
	
	module.controller("SginOutCtrl",SginOutCtot);

	 function SginOutCtot(CompanyServicesAPI)
	{
		 this.signOut = function(){
		 CompanyServicesAPI.signOut();
		 }
	}
	 
	 
})();