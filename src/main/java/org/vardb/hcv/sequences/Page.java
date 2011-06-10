package org.vardb.hcv.sequences;

import org.springframework.roo.addon.entity.RooEntity;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.tostring.RooToString;

@RooJavaBean
@RooToString
@RooEntity(table = "pages")
public class Page {
   
   private String identifier;
   private String title;
   private String text;
}
