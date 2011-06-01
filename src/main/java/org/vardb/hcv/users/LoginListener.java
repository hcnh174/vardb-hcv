package org.vardb.hcv.users;

public interface LoginListener
{
	void logLogin(String username, LoginService.LoginStatus status);
}
