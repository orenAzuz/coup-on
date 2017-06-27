/**
 * 
 */


    (function(){
    		

    		var module = angular.module("adminApp");
    		
    		module.controller("InfoCtrl",InfoCtor);

    		 function InfoCtor()
    		{
    			   
    			 var self = this;
    		  	   self.guideInfo = false;
    		  	   
    		  	   this.clintInfo = function(){
    		  		   console.log("click")
    		  		 self.guideInfo =! self.guideInfo; 
    		  		   
    		  	   } 
    		}
    })();