package WebService.CouponWebSystem;

import java.io.Serializable;
/**
 * This class is intended to serve all services by sending messages to a client.
 * @author user
 *
 */
public class MessageSetter implements Serializable{
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String message;

	/**
	 * This is an arguments constructor
	 * @param message
	 */
	public MessageSetter(String message) {
		super();
		this.message = message;
	}
	/**
	 * This is an empty constructor.
	 */
	public MessageSetter() {
	
	}

	/**
	 * getter for the message field.
	 * @return message
	 */
	public String getMessage() {
		return message;
	}

	/**
	 * setter for the message field
	 * @param message
	 */
	public void setMessage(String message) {
		this.message = message;
	}
	
	

}
