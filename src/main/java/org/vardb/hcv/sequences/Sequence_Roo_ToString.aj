// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package org.vardb.hcv.sequences;

import java.lang.String;

privileged aspect Sequence_Roo_ToString {
    
    public String Sequence.toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("Accession: ").append(getAccession()).append(", ");
        sb.append("Id: ").append(getId()).append(", ");
        sb.append("Identifier: ").append(getIdentifier()).append(", ");
        sb.append("Sequence: ").append(getSequence()).append(", ");
        sb.append("Version: ").append(getVersion());
        return sb.toString();
    }
    
}
