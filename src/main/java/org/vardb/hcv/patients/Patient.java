package org.vardb.hcv.patients;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.tostring.RooToString;

@RooJavaBean
@RooToString
@Document
public class Patient
{ 
	@Id
	private String identifier;
	private String firstname;
	private String lastname;
	private Date birthdate;
  
	public Patient(){}
  
	public Patient(String identifier)
	{
		this.identifier=identifier;
	}
}