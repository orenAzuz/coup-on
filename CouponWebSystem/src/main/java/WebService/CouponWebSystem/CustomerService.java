package WebService.CouponWebSystem;

import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import core.Coupon;
import core.CouponType;
import customExceptions.DuplicateException;
import customExceptions.PurchaseFailedException;
import customExceptions.RanOutOfStockException;
import facade.CompanyFacade;
import facade.CustomerFacade;

/**
 * This is the customer web service which including all 
 * functionality required for customer operations
 * @author user
 *
 */
@Path("/customer")
public class CustomerService {
	
	private MessageSetter messageSetter = new MessageSetter();
	@Context HttpServletRequest req;

	/**
	 * The role of this method is to provide the customer name to the client side.
	 * @return Response
	 */
	@GET
	@Path("/name")
	@Produces(MediaType.TEXT_PLAIN)
	public Response getName(){
		
		HttpSession sess =  req.getSession();
		String name = (String) sess.getAttribute("custName");
		System.out.println(name);
		
		return  javax.ws.rs.core.Response.ok(name).status(200).build();
		
	}
	/**
	 * This method will provide all the coupons owned by the customer.
	 * @return Response
	 */
	@GET
	@Path("/coupons")
	@Produces(MediaType.APPLICATION_JSON)
	public Response allCoupons(){
		
		HttpSession sess =  req.getSession();
		facade.CustomerFacade customer = (CustomerFacade)sess.getAttribute("customer");
		if(customer==null){return setErr400();}
		ArrayList<Coupon>allCoupons = new ArrayList<Coupon>();
		
		try {
			allCoupons = customer.getAllPurchasedCoupon();
		
		} catch (ClassNotFoundException | SQLException | InterruptedException e) {
			return setErr500(e.getMessage());
		}
		
		return javax.ws.rs.core.Response.ok(allCoupons).status(200).build();
	
	}

	/**
	 * This method role is allows the customer to purchase coupon. 
	 * using the coupon title that received from the client side.
	 * @param title
	 * @return response
	 */
	@PUT
	@Path("/purchaseCoupon/{title}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response purchaseCoupon(@PathParam("title")String title){
		
		HttpSession sess =  req.getSession();
		facade.CustomerFacade customer = (CustomerFacade)sess.getAttribute("customer");
		if(customer==null){return setErr400();}
		try {
			Coupon coupon = customer.getCouponByTitle(title);
			customer.purchaseCoupon(coupon);
		} catch (ClassNotFoundException | InterruptedException | SQLException | DuplicateException | RanOutOfStockException | PurchaseFailedException e) {
		
			return setErr500(e.getMessage());
		}
		messageSetter.setMessage("Greetings ! for purchased the coupon  "+title);
    	return javax.ws.rs.core.Response.ok(messageSetter).status(200).build(); 
	}
	
	/**
	 * This method will return coupons that in the customer ownership up to 
	 * the receiving price.
	 * @param price
	 * @return Response
	 */
	@GET
	@Path("/getPurchasedCouponsByPrice/{price}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response couponsByPrice (@PathParam("price")String price){
		
		ArrayList<Coupon>coupons = null;
		HttpSession sess =  req.getSession();
		facade.CustomerFacade customer = (CustomerFacade)sess.getAttribute("customer");
		if(customer==null){return setErr400();}
		try {
			coupons = customer.getAllPurchasedCouponByPrice(Double.parseDouble(price));
		} catch (ClassNotFoundException | SQLException | InterruptedException e) {
		
			return setErr500(e.getMessage());
		}
		return javax.ws.rs.core.Response.ok(coupons).status(200).build();
		
	}

	/**
	 * This method will return coupons that in the customer ownership according to 
	 * the receiving type.
	 * @param type
	 * @return Response
	 */
	@GET
	@Path("/getPurchasedCouponsByType/{type}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response couponsByType (@PathParam("type")String type){
		
		ArrayList<Coupon>coupons = null;
		HttpSession sess =  req.getSession();
		facade.CustomerFacade customer = (CustomerFacade)sess.getAttribute("customer");
		if(customer==null){return setErr400();}
		try {
			coupons = customer.getAllPurchasedCouponByType(CouponType.valueOf(type));
			
			
		} catch (ClassNotFoundException | SQLException | InterruptedException |IllegalArgumentException e) {
			
			return setErr500(e.getMessage());
		}
		return javax.ws.rs.core.Response.ok(coupons).status(200).build();
	}
	/**
	 * This method is providing all the coupons in the system so that the customer could watch and 
	 * purchase.
	 * @return Response
	 */
	@GET
	@Path("/allTheCouponsInTheSystem")
	@Produces(MediaType.APPLICATION_JSON)
	public Response allTheCouponsInTheSystem(){
		
		ArrayList<Coupon>coupons = null;
		HttpSession sess =  req.getSession();
		facade.CustomerFacade customer = (CustomerFacade)sess.getAttribute("customer");
		if(customer==null){return setErr400();}
		try {
			coupons = customer.seeAllCoupons();
			
			
		} catch (ClassNotFoundException | SQLException | InterruptedException e) {
			
			return setErr500(e.getMessage());
		}
		return  javax.ws.rs.core.Response.ok(coupons).status(200).build();
		
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
		sess.setAttribute("customer", null);
		
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
