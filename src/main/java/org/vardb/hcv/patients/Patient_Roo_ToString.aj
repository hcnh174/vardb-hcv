// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package org.vardb.hcv.patients;

import java.lang.String;

privileged aspect Patient_Roo_ToString {
    
    public String Patient.toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("Birthdate: ").append(getBirthdate()).append(", ");
        sb.append("Firstname: ").append(getFirstname()).append(", ");
        sb.append("Identifier: ").append(getIdentifier()).append(", ");
        sb.append("Lastname: ").append(getLastname());
        return sb.toString();
    }
    
}
