// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package org.vardb.hcv.sequences;

import java.lang.String;

privileged aspect Comment_Roo_ToString {
    
    public String Comment.toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("Date: ").append(getDate()).append(", ");
        sb.append("Id: ").append(getId()).append(", ");
        sb.append("Identifier: ").append(getIdentifier()).append(", ");
        sb.append("Text: ").append(getText()).append(", ");
        sb.append("Type: ").append(getType()).append(", ");
        sb.append("Username: ").append(getUsername()).append(", ");
        sb.append("Version: ").append(getVersion());
        return sb.toString();
    }
    
}
