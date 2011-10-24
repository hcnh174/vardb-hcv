package org.vardb.hcv.resources;

import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly=false)
public interface ResourceService
{
	public void testRepository();
}
