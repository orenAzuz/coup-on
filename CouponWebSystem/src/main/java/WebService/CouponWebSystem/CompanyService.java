package WebService.CouponWebSystem;

import java.sql.SQLException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

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
import core.CouponType;
import customExceptions.DuplicateException;
import customExceptions.NotAvailableException;
import facade.ClientType;
import facade.CompanyFacade;
import facade.CouponSystem;

/**
 * This is the company web service which including all 
 * functionality required for company operations
 * @author user
 *
 */
@Path("/company")
public class CompanyService {

	private MessageSetter messageSetter = new MessageSetter();
	@Context HttpServletRequest req;
	@Context HttpServletResponse res;
	
	/**
	 * The role of this method is to provide the company name to the client side.
	 * @return Response
	 */
	@GET
	@Path("/name")
	@Produces(MediaType.TEXT_PLAIN)
	public Response getName(){
		HttpSession sess =  req.getSession();
		String name = (String) sess.getAttribute("name");
		System.out.println(name);
		
		return  javax.ws.rs.core.Response.ok(name).status(200).build();
	}
	
	/**
	 * The role of this method is to provide the company details to the client side.
	 * @return Response
	 */
	@GET
	@Path("/getCompanyDetails")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCompanyDetails(){
		HttpSession sess =  req.getSession();
		facade.CompanyFacade companyFacade = (CompanyFacade)sess.getAttribute("company");
		 if(companyFacade == null){return setErr400();}
		Company company = new Company();
		try {
			company = companyFacade.getCompanyDetails();
		} catch (ClassNotFoundException | SQLException | InterruptedException | NotAvailableException e) {
			return setErr500(e.getMessage());
		}	
		return  javax.ws.rs.core.Response.ok(company).status(200).build();
	}
	
	/**
	 * This method is provide all the coupons of the specific company.
	 * @return Response
	 */
	@GET
	@Path("/coupons")
	@Produces(MediaType.APPLICATION_JSON)
	public Response allCoupons(){
		
		HttpSession sess =  req.getSession();
		facade.CompanyFacade company = (CompanyFacade)sess.getAttribute("company");
		 if(company==null){return setErr400();}
		ArrayList<Coupon>allCoupons = new ArrayList<Coupon>();
		
		try {
			allCoupons = company.getAllCoupon();
		} catch (ClassNotFoundException | SQLException | InterruptedException e) {
			
			return setErr500(e.getMessage());
		}
		
		return  javax.ws.rs.core.Response.ok(allCoupons).status(200).build();
		
		
	}
     /**
      * This method allows the creation of a coupon by a coupon object capacitance from a client side 
      * With a Class CouponConductor that converts it to a core type
      * @param couponc
      * @return Response
      */
	@POST
	@Path("/createCoupon")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response CreateCoupon(CouponConductor couponc) {
	
		
		HttpSession sess =  req.getSession();
		facade.CompanyFacade company = (CompanyFacade)sess.getAttribute("company");
		 if(company==null){return setErr400();}
		try 
		{
			company.creatCoupon(couponc.inject());
		} 
		catch (ClassNotFoundException | SQLException | InterruptedException | DuplicateException | NumberFormatException | ParseException e)
		{
			
			return setErr500(e.getMessage());
		}
		messageSetter.setMessage(" The coupon "+ couponc.getTitle() + 
		" was created successfully !");
		return javax.ws.rs.core.Response.ok(messageSetter).status(200).build();

		
	}			

	/**
	 * This method allows the deleting of coupon it receiving the coupon title and 
	 * by doing this, it is extracted from the database and sent to delete it.
	 * @param title
	 * @return
	 */
	@DELETE
	@Path("/removeCoupon/{couponToRemove}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response removeCoupon(@PathParam("couponToRemove")String title){
		System.out.println(title);
		Coupon coupon = new Coupon();
		coupon.setTitle(title);
		HttpSession sess =  req.getSession();
		facade.CompanyFacade company = (CompanyFacade)sess.getAttribute("company");
		 if(company==null){return setErr400();}
		try {
			company.removeCoupon(coupon);
			messageSetter.setMessage(" The coupon "+ coupon.getTitle() + 
					" was successfully removed");
			

		} catch (ClassNotFoundException | SQLException | InterruptedException | NotAvailableException e) {
			return setErr500(e.getMessage());
		}
		return javax.ws.rs.core.Response.ok(messageSetter).status(200).build();
	}

	/**
	 * This method role is to receiving a coupon type and returns coupons that 
	 * belong to the company according to the type sent.
	 * @param couponType
	 * @return Response
	 */
	@GET
	@Path("/couponsByType/{type}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCouponByType(@PathParam("type")String couponType){
		
		HttpSession sess =  req.getSession();
		facade.CompanyFacade company = (CompanyFacade)sess.getAttribute("company");
		 if(company==null){return setErr400();}
		ArrayList<Coupon> coupon = null;
		try {
			coupon = company.getCouponByType(CouponType.valueOf(couponType));
		} catch (ClassNotFoundException | SQLException | InterruptedException e) {
			return setErr500(e.getMessage());

		}
		
		return javax.ws.rs.core.Response.ok(coupon).status(200).build();
	}

	/**
	 * This method role is to receiving a coupon id and returns coupon that 
	 * belong to the company according to the id sent.
	 * @param id
	 * @return Response
	 */
	@GET
	@Path("/couponById/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response getCouponById (@PathParam("id")long id){
  
		ArrayList<Coupon>couponList = new ArrayList<>();
		HttpSession sess =  req.getSession();
		facade.CompanyFacade company = (CompanyFacade)sess.getAttribute("company");
		 if(company==null){return setErr400();}

		try {
			couponList.add(company.getCouponById(id));
		} catch (ClassNotFoundException | SQLException | InterruptedException | NotAvailableException e) {
			return setErr500(e.getMessage());
		}
		
		return javax.ws.rs.core.Response.ok(couponList).status(200).build();
		
	}
	
	/**
	 * This method role is to receiving a date and returns coupons that 
	 * belong to the company  up to that date received.
	 * using webDate class to convert the date from web to java.
	 * @param webDate
	 * @return Response
	 */
	@POST
	@Path("/couponByEndDate")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response getCouponByEndDate (WebDate webDate) {
		
		
		ArrayList<Coupon>couponList = new ArrayList<>();
		HttpSession sess =  req.getSession();
		facade.CompanyFacade company = (CompanyFacade)sess.getAttribute("company");
		 if(company==null){return setErr400();}
		
			
			
			try {
				couponList.addAll(company.getCouponsByEndDate(webDate.convertDate()));
			} catch (ClassNotFoundException | SQLException | InterruptedException e) {
				return setErr500(e.getMessage());

			}
		
		
		return javax.ws.rs.core.Response.ok(couponList).status(200).build();
		
	}

	/**
	 * This method allows to update a coupon by receiving a coupon object 
	 * from client side and using the couponCondactor class to covert it to coupon
	 * core type .
	 * @param coupon
	 * @return Response
	 */
	@PUT
	@Path("/updateCoupon")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response update(CouponConductor coupon){
		
		HttpSession sess =  req.getSession();
		facade.CompanyFacade company = (CompanyFacade)sess.getAttribute("company");
		 if(company==null){return setErr400();}
	     
		try {
			company.updateCoupon(coupon.inject());
			messageSetter.setMessage("The coupon "+coupon.getTitle()+" was successfully updated");
		} catch (ClassNotFoundException | SQLException | InterruptedException | NumberFormatException | ParseException e) {
			return setErr500(e.getMessage());
		}
		 return javax.ws.rs.core.Response.ok(messageSetter).status(200).build();
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
		sess.setAttribute("company", null);
		
		System.out.println("im out...");
		
	}
	
	 /**
     * This method aims to serve the administrator web service and make it easier to send 
     * error messages to a client in the scenario that SESSION is lost .
     * @return Response
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
     * @return Response
     */
	private Response setErr500(String e){
		
		messageSetter.setMessage(e);
		return	javax.ws.rs.core.Response.ok(messageSetter)
		.status(500).build();
	}
	
}



