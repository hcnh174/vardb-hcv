// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package org.vardb.hcv.users;

import java.lang.Boolean;
import java.lang.String;
import java.util.Date;

privileged aspect User_Roo_JavaBean {
    
    public String User.getUsername() {
        return this.username;
    }
    
    public void User.setUsername(String username) {
        this.username = username;
    }
    
    public String User.getPassword() {
        return this.password;
    }
    
    public void User.setPassword(String password) {
        this.password = password;
    }
    
    public Boolean User.getEnabled() {
        return this.enabled;
    }
    
    public void User.setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }
    
    public Boolean User.getAdministrator() {
        return this.administrator;
    }
    
    public void User.setAdministrator(Boolean administrator) {
        this.administrator = administrator;
    }
    
    public String User.getFirstname() {
        return this.firstname;
    }
    
    public void User.setFirstname(String firstname) {
        this.firstname = firstname;
    }
    
    public String User.getLastname() {
        return this.lastname;
    }
    
    public void User.setLastname(String lastname) {
        this.lastname = lastname;
    }
    
    public String User.getEmail() {
        return this.email;
    }
    
    public void User.setEmail(String email) {
        this.email = email;
    }
    
    public String User.getAffiliation() {
        return this.affiliation;
    }
    
    public void User.setAffiliation(String affiliation) {
        this.affiliation = affiliation;
    }
    
    public Date User.getCreated() {
        return this.created;
    }
    
    public void User.setCreated(Date created) {
        this.created = created;
    }
    
    public Date User.getUpdated() {
        return this.updated;
    }
    
    public void User.setUpdated(Date updated) {
        this.updated = updated;
    }
    
}
