package org.vardb.hcv.sequences;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
public interface TermRepository extends JpaRepository<Term, Long> {

	Term findByIdentifier(String identifier);
}