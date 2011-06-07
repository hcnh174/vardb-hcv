package org.vardb.hcv.resources;

import org.springframework.data.annotation.Id;
import org.springframework.data.document.mongodb.mapping.Document;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.tostring.RooToString;

@RooJavaBean
@RooToString
@Document
public class Pathogen {

  
	@Id
	private String identifier;

  private Integer taxid;

  private String name;

  private String description;
  
  public Pathogen(){}
  
  public Pathogen(String name)
  {
	  this.name=name;
  }
}