/**
 * 
 * 
 * 
 * 
 */

$(document).ready(function(){
  $('.dropdown-submenu a.couponMenu').on("click", function(e){
    $(this).next('div').toggle();
    e.stopPropagation();
    e.preventDefault();
  });
});