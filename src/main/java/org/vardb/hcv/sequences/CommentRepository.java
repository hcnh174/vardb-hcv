package org.vardb.hcv.sequences;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
public interface CommentRepository extends JpaRepository<Comment, Long> {

	List<Comment> findByTypeAndIdentifier(String type, String identifier);
}