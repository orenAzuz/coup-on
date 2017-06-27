/**
 * 
 */




(function(){
	

	var module = angular.module("customerApp");
	
	module.controller("CustomerNameCtrl",CustomerNameCtor);
	
	
	 function CustomerNameCtor(CustomerServicesAPI)
		{
         var self = this;
        

         
         CustomerServicesAPI.getName()
			.then(function(data){

                    self.name = data;
			})
		
			   
  	   self.guideInfo = false;
  	   
  	   this.clintInfo = function(){
  		   console.log("click")
  		 self.guideInfo =! self.guideInfo; 
  		   
  	   }
  	   
  	   
	
     
     
}
})();