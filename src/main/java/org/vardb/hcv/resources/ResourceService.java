package org.vardb.hcv.resources;

import java.util.Collection;
import java.util.List;

import org.dom4j.Element;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly=false)
public interface ResourceService
{
	public void testRepository();
}
