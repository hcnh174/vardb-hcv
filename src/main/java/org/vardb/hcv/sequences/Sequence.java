package org.vardb.hcv.sequences;

import org.springframework.roo.addon.entity.RooEntity;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.tostring.RooToString;
import javax.validation.constraints.NotNull;

@RooJavaBean
@RooToString
@RooEntity(table = "sequences")
public class Sequence {

    @NotNull
    private String accession;

    @NotNull
    private String sequence;
    
    private String genotype;
    
    public Sequence()
    {
    	
    }
    
    public Sequence(String accession)
    {
    	this.accession=accession;
    }
    
    public Sequence(String accession, String sequence)
    {
    	this.accession=accession;
    	this.sequence=sequence;
    }
}
