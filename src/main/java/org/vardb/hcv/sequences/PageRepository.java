package org.vardb.hcv.sequences;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PageRepository extends JpaRepository<Page, String>
{
	Page findByIdentifier(String identifier);
}