package WebService.CouponWebSystem;

import java.io.Serializable;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import javax.xml.bind.annotation.XmlRootElement;

/**
 * This class role is to convert the date from the date that received from the 
 * client side to java date.  
 * @author user
 *
 */
@XmlRootElement
public class WebDate implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	
	private String stringDate;
	private Date javaDate;
	
	/**
	 * This is an empty constructor
	 */
	public WebDate(){
		
	}
	
	/**
	 * This is an argument constructor
	 * @param stringDate
	 */
	public WebDate(String stringDate) {
		super();
		this.stringDate = stringDate;
	}
	/**
	 * This is  a getter for the web date.
	 * @return stringDate
	 */
	public String getStringDate() {
		return stringDate;
	}
	/**
	 * this is a setter for the web date.
	 * @param stringDate
	 */
	public void setStringDate(String stringDate) {
		this.stringDate = stringDate;
	}
	/**
	 * This is a getter for java dtae.
	 * @return Date
	 */
	public Date getJavaDate() {
		return javaDate;
	}
	/**
	 * This is the setter for java date.
	 * @param javaDate
	 */
	public void setJavaDate(Date javaDate) {
		this.javaDate = javaDate;
	}
	/**
	 * This is the method which converting the date from web date to 
	 * java date.
	 * @return Date
	 */
	public Date convertDate(){
		
		final String DATE_FORMAT_PATTERN = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'";
		SimpleDateFormat dateFormat = new SimpleDateFormat(DATE_FORMAT_PATTERN, Locale.getDefault());
		
		try {
			 javaDate = dateFormat.parse(stringDate);
		} catch (ParseException e) {
			
			e.printStackTrace();
		}
		return javaDate;
	}

}
