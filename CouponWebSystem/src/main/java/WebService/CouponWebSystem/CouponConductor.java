package WebService.CouponWebSystem;

import java.io.Serializable;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import javax.xml.bind.annotation.XmlRootElement;

import core.Coupon;
import core.CouponType;

/**
 * This class was built from the need to convert fields in a coupon 
 * that could not be accepted from client side and entered DB
 * @author user
 *
 */
@XmlRootElement
public class CouponConductor  implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private long id;
	private String title;
	private String startDate;
	private String endDate;
	private int amount;
	private String type;
	private String price;
	private String image;
	private String massage;
	
	/**
	 * This is an empty constructor.
	 */
	public CouponConductor(){
		
	}
	
	public CouponConductor( String title, String startDate, String endDate, int amount, String type,
			String price, String image, String massage) {
		
		
		this.title = title;
		this.startDate = startDate;
		this.endDate = endDate;
		this.amount = amount;
		this.type = type;
		this.price = price;
		this.image = image;
		this.massage = massage;
	}
	
	/**
	 * getter for id field.
	 * @return id
	 */

	public long getId() {
		return id;
	}

	/**
	 * setter for the id field.
	 * @param id
	 */
	public void setId(long id) {
		this.id = id;
	}
	/**
	 * getter for title.
	 * @return
	 */
	public String getTitle() {
		return title;
	}

	/**
	 * Stter for title
	 * @param title
	 */
	public void setTitle(String title) {
		this.title = title;
	}

	/**
	 * getter for start date.
	 * @return startDate.
	 */
	public String getStartDate() {
		return startDate;
	}

	/**
	 * setter for start date
	 * @param startDate
	 */
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	/**
	 * getter for endDate.
	 * @return endDate
	 */
	public String getEndDate() {
		return endDate;
	}

	/**
	 * setter for endDate.
	 * @param endDate
	 */
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	/**
	 * getter for amount field.
	 * @return amount
	 */
	public int getAmount() {
		return amount;
	}

	/**
	 * setter for the  amount field.
	 * @param amount
	 */
	public void setAmount(int amount) {
		this.amount = amount;
	}

	/**
	 * getter for type field.
	 * @return type
	 */
	public String getType() {
		return type;
	}

	/**
	 * setter for type field.
	 * @param type
	 */
	public void setType(String type) {
		this.type = type;
	}

	/**
	 * getter for price field.
	 * @return price
	 */
	public String getPrice() {
		return price;
	}

	/**
	 * setter for price field.
	 * @param price
	 */
	public void setPrice(String price) {
		this.price = price;
	}

	/**
	 * getter for image field.
	 * @return image
	 */
	public String getImage() {
		return image;
	}

	/**
	 * setter for image field.
	 * @param image
	 */
	public void setImage(String image) {
		this.image = image;
	}

	/**
	 * getter for message field.
	 * @return massage.
	 */
	public String getMassage() {
		return massage;
	}

	/**
	 * setter for message field
	 * @param massage
	 */
	public void setMassage(String massage) {
		this.massage = massage;
	}

	/**
	 * This is the method that is responsible for converting the coupon.
	 * @return Coupon
	 * @throws NumberFormatException
	 * @throws ParseException
	 */
	public Coupon inject() throws NumberFormatException, ParseException{
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy/MM/dd",Locale.US);

		SimpleDateFormat dateFormating = new SimpleDateFormat("dd/MM/yyyy");
		final String DATE_FORMAT_PATTERN = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'";
		SimpleDateFormat dateFormat = new SimpleDateFormat(DATE_FORMAT_PATTERN, Locale.US);
		Coupon coupon = null;
	          
			coupon = new Coupon(0, title, dateFormat.parse(startDate), dateFormat.parse(endDate), amount,
					CouponType.valueOf(type), massage, Double.parseDouble(price), image);
			System.out.println(dateFormat.parse(endDate));
			System.out.println(endDate);
	
		
		return coupon;
		
	}


	@Override
	public String toString() {
		return "CouponConductor [id=" + id + ", title=" + title + ", startDate=" + startDate + ", endDate=" + endDate
				+ ", amount=" + amount + ", type=" + type + ", price=" + price + ", image=" + image + ", massage="
				+ massage + "]";
	}

}
