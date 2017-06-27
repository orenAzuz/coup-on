package loginPackage;

import java.io.IOException;

import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


import facade.AdminFacade;
import facade.ClientType;
import facade.CompanyFacade;
import facade.CouponSystem;
import facade.CustomerFacade;

/**
 * this is the log in servlet which takes care of all the logic of entering the system 
 * Servlet implementation class TheLogin
 * 
 */
public class TheLogin extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * an empty constructor .
     * @see HttpServlet#HttpServlet()
     */
    public TheLogin() {
        super();
    }
       
  	
  	/**
  	 * The method which executes the login system. If the login fails, a message will be sent in the form of cookie. 
  	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
  	 */
  	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
  		
  		
  		try {
  		
  		AdminFacade admin = null;

  		String user = request.getParameter("a");
  		String name = request.getParameter("username");
  		String password = request.getParameter("password");
  		
  		switch (user) {
  		case "admin":
  				
  				admin = (AdminFacade) CouponSystem.getInstance().login(name, password, ClientType.valueOf(user));


  				
  				if(admin==null)
  				{
  					HttpSession sess = request.getSession();
  					response.addCookie(new Cookie("errorMessage", "error"));
  					response.sendRedirect(request.getHeader("Referer"));
  					
  				  if (sess != null) {
  				    sess.invalidate();}
  				}
  				else{

  				
                  
      				HttpSession sess = request.getSession();
      				      				sess.setAttribute("admin",admin);
      				response.addCookie(new Cookie("errorMessage", null));      				
  					response.sendRedirect("http://localhost:8080/CouponWebSystem/AdminSPA.html");
  					response.getWriter().close();
                      System.out.println(admin);


  				}
  				
		break;

	case"company":
		CompanyFacade company = (CompanyFacade) CouponSystem.getInstance().login(name, password, ClientType.valueOf(user));
		if(company!=null){
		HttpSession sess = request.getSession();
			sess.setAttribute("company",company);
			sess.setAttribute("name",name );
			response.addCookie(new Cookie("errorMessage", null));
			response.sendRedirect("http://localhost:8080/CouponWebSystem/CompanySPA.html");
            }
		else{
			HttpSession sess = request.getSession();
			response.addCookie(new Cookie("errorMessage", "error"));
			sess.setAttribute("errorMessage", "There was an error checking the submitted data Please check name, user and password");
			response.sendRedirect(request.getHeader("Referer"));
		}
		
		break;

	case"customer":
		CustomerFacade customer = (CustomerFacade) CouponSystem.getInstance().login(name, password, ClientType.valueOf(user));
		if(customer!=null){
		HttpSession session = request.getSession();
		session.setAttribute("customer",customer);
		session.setAttribute("custName",name );
		response.addCookie(new Cookie("errorMessage", null));
		response.sendRedirect("http://localhost:8080/CouponWebSystem/CustomerSPA.html");
        }
		else{
			response.addCookie(new Cookie("errorMessage", "error"));
			response.sendRedirect(request.getHeader("Referer"));
		}
		
		break;

	default:
		break;
	}
	
  	
	
		
	} catch (ClassNotFoundException | SQLException | InterruptedException e) {
		
		e.printStackTrace();}		
			
	
	
}
		
		
		
		
		
		
		
}
