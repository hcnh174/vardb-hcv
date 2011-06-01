package org.vardb.hcv.sequences;

import org.springframework.roo.addon.entity.RooEntity;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.tostring.RooToString;
import javax.validation.constraints.NotNull;

@RooJavaBean
@RooToString
@RooEntity
public class Sequence {

    @NotNull
    private String identifier;

    @NotNull
    private String accession;

    @NotNull
    private String sequence;
}
