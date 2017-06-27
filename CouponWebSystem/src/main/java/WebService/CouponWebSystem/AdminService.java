package WebService.CouponWebSystem;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextListener;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import core.Company;
import core.Coupon;
import core.Customer;
import customExceptions.DuplicateException;
import customExceptions.NotAvailableException;
import dbDAO.CompList;
import facade.AdminFacade;
import facade.ClientType;
import facade.CompanyFacade;
import facade.CouponSystem;
import loginPackage.TheLogin;

/**
 * This is the administrator web service which include all 
 * the functionality for management this web site.
 * Root resource (exposed at "admin" path)
 * 
 */


@Path("/admin")
public class AdminService {
	
	private MessageSetter messageSetter = new MessageSetter();
	@Context HttpServletRequest req;
	@Context HttpServletResponse response;
	
/**
 * This method allowing the administrator to watch all the companies in the system 
 * and all their personal details including their coupons. 
 * @return Response
 */
   @GET
   @Path("/allCompanies")
   @Produces(MediaType.APPLICATION_JSON)
   public Response allCompanies() {

	ArrayList<Company>clist = null;
	HttpSession sess =  req.getSession();
	facade.AdminFacade admin = (AdminFacade)sess.getAttribute("admin");
	if(admin == null){return setErr400();}
	try {

		clist = (admin.getAllCompanies());
		
	} catch (ClassNotFoundException | SQLException | InterruptedException e) {
		return setErr500(e.getMessage());
		
	}

	
	return javax.ws.rs.core.Response.ok(clist).status(200).build();
}
   /**
    * This method allowing the administrator to watch all the customers in the system 
    * and all their personal details including their coupons. 
    * @return Response
    */
   
    @GET
    @Path("/customers")
    @Produces(MediaType.APPLICATION_JSON)
    public Response allCustomers(){
    	ArrayList<Customer>allCust = null;
    	HttpSession sess =  req.getSession();
    	facade.AdminFacade admin = (AdminFacade)sess.getAttribute("admin");
    	if(admin==null){return setErr400();}
    		try {

			allCust = admin.getAllCustomer();
		
			 
			} catch (ClassNotFoundException | SQLException | InterruptedException e) {
				return setErr500(e.getMessage());
			}
   
    	return javax.ws.rs.core.Response.ok(allCust).status(200).build();
    }
  /**
   * This method is gives the option to create a company and add it 
   * to the system that permitted only 
   * by the administrator.
   * @param company
   * @return Response
   */
 	@POST
 	@Path("/createCompany")
 	@Consumes(MediaType.APPLICATION_JSON)
    public Response createCompany( Company company) {
 	
 		
 		HttpSession sess =  req.getSession();
    	facade.AdminFacade admin = (AdminFacade)sess.getAttribute("admin");
    	if(admin==null){return setErr400();}
    	try {
    	
			admin.createCompany(company);
		
		} catch (ClassNotFoundException | SQLException | InterruptedException | DuplicateException  e) {
		   
			return setErr500(e.getMessage());

		}
    	messageSetter.setMessage(" The Company "+ company.getCompName() + 
				" Successfully created");
    	return javax.ws.rs.core.Response.ok(messageSetter).status(200).build();

    	
    }
    
 	/**
 	 * This method is gives the option to create a customer and 
 	 * add him to the system. that permitted only 
     * by the administrator.
 	 * @param customer
 	 * @return Response
 	 */
	@POST
 	@Path("/createCustomer")
 	@Consumes(MediaType.APPLICATION_JSON)
    public Response createCustomer( Customer customer){
 		
 		HttpSession sess =  req.getSession();
    	facade.AdminFacade admin = (AdminFacade)sess.getAttribute("admin");
    	if(admin==null){return setErr400();}
    	try {
			admin.createCustomer(customer);
		} catch (ClassNotFoundException | SQLException | InterruptedException | DuplicateException e) {
			return setErr500(e.getMessage());
		}
    	
    	messageSetter.setMessage("The Customer Name "+customer.getCustName()+" Successfully Created");
    	return javax.ws.rs.core.Response.ok(messageSetter).status(200).build(); 
    }
	
	/**
	 * This method is gives the option to delete a company from 
     * the system that permitted only  by the administrator. 
     * it have to accept the name of the company from the client 
     * side to perform the task .
	 * @param name
	 * @return Response
	 */
    @DELETE
    @Path("/removeCompany/{name}")
    @Consumes(MediaType.APPLICATION_JSON)
	public Response removeComapny(@PathParam("name")String name){
		
    	Company company = new Company();
    	company.setCompName(name);
    	HttpSession sess =  req.getSession();
    	facade.AdminFacade admin = (AdminFacade)sess.getAttribute("admin");
    	if(admin==null){return setErr400();}
    	try {
			admin.removeCompany(company);
		} catch (ClassNotFoundException | SQLException | InterruptedException | NotAvailableException e) {
			return setErr500(e.getMessage());
		}
    	messageSetter.setMessage("The Company Name "+name+" Successfully Removed");
    	return javax.ws.rs.core.Response.ok(messageSetter).status(200).build(); 
		
	}
    
    /**
     * This method is gives the option to delete a customer from 
     * the system that permitted only by the administrator. 
     * it have to accept the name of the customer from the client 
     * side to perform the task .
     * 
     * @param name
     * @return Response
     */
    @DELETE
    @Path("/removeCustomer/{name}")
    @Consumes(MediaType.APPLICATION_JSON)
	public Response removeCustomer(@PathParam("name")String name ){
		
    	Customer customer = new Customer();
    	customer.setCustName(name);
    	HttpSession sess =  req.getSession();
    	facade.AdminFacade admin = (AdminFacade)sess.getAttribute("admin");
    	if(admin==null){return setErr400();}
    	try {
			admin.removeCustomer(customer);
		} catch (ClassNotFoundException | SQLException | InterruptedException | NotAvailableException e) {
			return setErr500(e.getMessage());
		}
    	messageSetter.setMessage("The Customer Name "+name+" Successfully Removed");
    	return javax.ws.rs.core.Response.ok(messageSetter).status(200).build(); 
	}
    
    /**
     * This method is gives the option to update a company it accepting 
     * a company object from the client and updating the mail and password fields 
     * in the system. that permitted only 
     * by the administrator.
     * @param company
     * @return Response
     */
    @PUT
    @Path("/updateCompany")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateComopany(Company company)
    {
    	HttpSession sess =  req.getSession();
    	facade.AdminFacade admin = (AdminFacade)sess.getAttribute("admin");	
    	if(admin==null){return setErr400();}
    	try {
			admin.updateCompany(company);
		} catch (ClassNotFoundException | SQLException | InterruptedException e) {
			return setErr500(e.getMessage());
		}
    	messageSetter.setMessage("The Company Name "+company.getCompName()+" Successfully Updated");
    	return javax.ws.rs.core.Response.ok(messageSetter).status(200).build(); 
    }
    
    /**
     * This method is gives the option to update a customer it accepting 
     * a customer object from the client and updating the password field 
     * in the system. that permitted only 
     * by the administrator.
     * @param customer
     * @return Response
     */
    
    @PUT
    @Path("/updateCustomer")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateCustomer(Customer customer)
    {
    	HttpSession sess =  req.getSession();
    	facade.AdminFacade admin = (AdminFacade)sess.getAttribute("admin");	
    	if(admin==null){return setErr400();}
    	try {
			admin.updateCustomet(customer);
		} catch (ClassNotFoundException | SQLException | InterruptedException e) {
			return setErr500(e.getMessage());
		}
    	messageSetter.setMessage("The Customer Name "+customer.getCustName()+" Successfully Updated");
    	return javax.ws.rs.core.Response.ok(messageSetter).status(200).build(); 
    	
    }
    
    /**
     * This method role is for searching a customer by his id field
     * in a scenario the id is not valid the client will be given an 
     * exception that the customer is not found. 
     * otherwise it return the customer object and send it as a json.
     * 
     * @param id
     * @return Response
     */
    @GET
    @Path("/customerById/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCustomerById(@PathParam("id")Long id){
    	
        Customer customer = null;
    	HttpSession sess =  req.getSession();
    	facade.AdminFacade admin = (AdminFacade)sess.getAttribute("admin");	
    	if(admin==null){return setErr400();}
    	try {
    		
    		
			customer = admin.getCustomer(id);
		} catch (ClassNotFoundException | SQLException | InterruptedException | NotAvailableException e) {
			return setErr500(e.getMessage());
		}
    	
    	return javax.ws.rs.core.Response.ok(customer).status(200).build();
    }
    
    /**
     * This method role is for searching a company by its id field
     * in a scenario the id is not valid the client will be given an 
     * exception that the company is not found. 
     * otherwise it return the company object and send it as a json.
     * @param id
     * @return Response
     */
    @GET
    @Path("/companyById/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCompanyById(@PathParam("id")Long id){
    	
        Company company = null;
    	HttpSession sess =  req.getSession();
    	facade.AdminFacade admin = (AdminFacade)sess.getAttribute("admin");	
    	 if(admin==null){return setErr400();}
    	try {
    		
			company = admin.getCompanyById(id);
		} catch (ClassNotFoundException | SQLException | InterruptedException | NotAvailableException e) {
		
			return setErr500(e.getMessage());
		}
    	
    	return javax.ws.rs.core.Response.ok(company).status(200).build();
    }
    
    /**
     * This is the sign out method it only set the
     * session of the administrator to null on a purpose
     * that no one else can take action without log in the 
     * system.
     */
    @GET
	@Path("/signOut")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public void signOut(){
		
		HttpSession sess =  req.getSession();
		sess.setAttribute("admin", null);
		
		System.out.println("im out...");
		
	}
    /**
     * This method aims to serve the administrator web service and make it easier to send 
     * error messages to a client in the scenario that SESSION is lost .
     * @return
     */
  private Response setErr400(){
		
		messageSetter.setMessage("Please re-sign in the system");
		return javax.ws.rs.core.Response.ok(messageSetter)
			.status(400).build();
		
	}
  
    /**
     * This method aims to serve the administrator web service and make it easier to send 
     * error messages to a client in the scenario that an exception is thrown  .
     * @param e
     * @return
     */
	private Response setErr500(String e){
		
		messageSetter.setMessage(e);
		return	javax.ws.rs.core.Response.ok(messageSetter)
		.status(500).build();
	}
    
    
    

}