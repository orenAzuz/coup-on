/**
 * 
 */

	function getAllCompanies() {
		$
				.ajax(
						{

							url : "http://localhost:8080/CouponWebSystem/webapi/admin/allCompanies",
							method : "GET",
							dataType : 'json',
						})
				.then(
						function c(data) {

							var couponsList = "";
							for (var i = 0; i < data.length; i++) {
								$('.greeting-content')
										.append(
												'<b> id = '
														+ data[i]["id"]
														+ ', The Company name is  = '
														+ data[i]["copmName"]
														+ ', The password is = '
														+ data[i]["password"]
														+ ', The email = '
														+ data[i]["email"]
														+ ', The coupons are: </b><br><br>');
								var compName = data[i].copmName;
								var compPassword = data[i].password;
								var compEmail = data[i].email;
								console.log("The name is " + compName);

								for (var count = 0; count < data[i].coupons.length; count++) {

									$('.greeting-content')
											.append(
													'<b> id = '
															+ data[i].coupons[count]["id"]
															+ ' </b><br><b>Title = '
															+ data[i].coupons[count]["title"]
															+ ' </b><br><b>Start Date = '
															+ data[i].coupons[count]["startDate"]
															+ '</b><br><b>End Date = '
															+ data[i].coupons[count]["endDate"]
															+ '</b><br><b>,Amount = '
															+ data[i].coupons[count]["amount"]
															+ ' </b><br><b>Type = '
															+ data[i].coupons[count]["type"]
															+ '</b><br><b> Price = '
															+ data[i].coupons[count]["price"]
															+ '</b><br><b> Image = '
															+ data[i].coupons[count]["image"]
															+ '</b><br><b> Massage = '
															+ data[i].coupons[count]["massage"]
															+ '</b><br><br>');
								}
							}

						});

	}

	function getAllCustomers() {
		$
				.ajax(
						{

							url : "http://localhost:8080/CouponWebSystem/webapi/admin/customers",
							method : "GET",
							dataType : 'json',
						})
				.then(
						function(data) {

							for (var i = 0; i < data.length; i++) {
								$('.greeting-content')
										.append(
												'<b> id = '
														+ data[i]["id"]
														+ ', The Customer name is  = '
														+ data[i]["custName"]
														+ ', The password is = '
														+ data[i]["password"]
														+ ', Yuor purchased coupons are: </b><br><br>');

								for (var count = 0; count < data[i].coupon.length; count++) {

									$('.greeting-content')
											.append(
													'<b> id = '
															+ data[i].coupon[count]["id"]
															+ ' </b><br><b>Title = '
															+ data[i].coupon[count]["title"]
															+ ' </b><br><b>Start Date = '
															+ data[i].coupon[count]["startDate"]
															+ '</b><br><b>End Date = '
															+ data[i].coupon[count]["endDate"]
															+ '</b><br><b>,Amount = '
															+ data[i].coupon[count]["amount"]
															+ ' </b><br><b>Type = '
															+ data[i].coupon[count]["type"]
															+ '</b><br><b> Price = '
															+ data[i].coupon[count]["price"]
															+ '</b><br><b> Image = '
															+ data[i].coupon[count]["image"]
															+ '</b><br><b> Massage = '
															+ data[i].coupon[count]["massage"]
															+ '</b><br><br>');

								}
							}
						});

	}

	function createCompany() {

		var name = document.getElementById("compName").value;
		var password = document.getElementById("compPassword").value;
		var email = document.getElementById("compEmail").value;

		$
				.ajax({
					url : "http://localhost:8080/CouponWebSystem/webapi/admin/createCompany",
					method : "POST",
					dataType : 'json',
					contentType : "application/json",
					data : JSON.stringify({
						"id" : "1",
						"copmName" : name,
						"password" : password,
						"email" : email
					}),
					
					success : function(data){
						alert(data);
					},
				//	error:function(jqXHR,textStatus,errorThrown){
						
				//	}
				});

	}
	function removeCompany() {

		var name = document.getElementById("RcompName").value;
		var password = document.getElementById("RcompPassword").value;
		var email = document.getElementById("RcompEmail").value;

		$
				.ajax({
					url : "http://localhost:8080/CouponWebSystem/webapi/admin/removeCompany",
					method : "DELETE",
					dataType : 'json',
					contentType : "application/json",
					data : JSON.stringify({
						"id" : "1",
						"copmName" : name,
						"password" : password,
						"email" : email
					})
				});

		console.log("The name is " + name.value);
	}
	function removeCustomer() {

		var name = document.getElementById("RcustName").value;
		var password = document.getElementById("RcustPassword").value;

		$
				.ajax({
					url : "http://localhost:8080/CouponWebSystem/webapi/admin/removeCustomer",
					method : "DELETE",
					dataType : 'json',
					contentType : "application/json",
					data : JSON.stringify({
						"id" : "1",
						"custName" : name,
						"password" : password
					})
				});

		console.log("The name is " + name.value);
	}

	function createCustomer() {

		var name = document.getElementById("textField_Name").value;
		var password = document.getElementById("textField_Password").value;

		$
				.ajax({
					url : "http://localhost:8080/CouponWebSystem/webapi/admin/createCustomer",
					method : "POST",
					dataType : 'json',
					contentType : "application/json",
					data : JSON.stringify({
						"id" : "1",
						"custName" : name,
						"password" : password
					})

				});

	}
	function showCreateCompanyDiv(id){
		
		       var e = document.getElementById("createCompanyDiv");
		       
		       
		       if(e.style.display == "block"){
		          e.style.display = "none";
		       showCreateCustomerDiv().e.style.display="none";
		       }
		       else
		          e.style.display = "block";
		   
	}
	

	function showCreateCustomerDiv(id){
		
		       var e = document.getElementById("createCustomerDiv");
		       
		       
		       if(e.style.display == "block")
		          e.style.display = "none";
		       else
		          e.style.display = "block";
		   
	}

	function showRemoveCompanyDiv(id){
		
		       var e = document.getElementById("removeCompanyDiv");
		       
		       
		       if(e.style.display == "block")
		          e.style.display = "none";
		       else
		          e.style.display = "block";
		   
	}

	function showRemoveCustomerDiv(id){
		
	       var e = document.getElementById("removeCustomerDiv");
	       
	       
	       if(e.style.display == "block")
	          e.style.display = "none";
	       else
	          e.style.display = "block";
	   
}
	

	function showUpdateCompanyDiv(id){
		
	       var e = document.getElementById("updateCompanyDiv");
	       
	       
	       if(e.style.display == "block")
	          e.style.display = "none";
	       else
	          e.style.display = "block";
	   
}

	function showUpdateCustomerDiv(id){
		
	       var e = document.getElementById("updateCustomerDiv");
	       
	       
	       if(e.style.display == "block")
	          e.style.display = "none";
	       else
	          e.style.display = "block";
	   
}
	
	
	
	
	

