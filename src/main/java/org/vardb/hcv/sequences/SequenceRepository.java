package org.vardb.hcv.sequences;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

//@Transactional()
public interface SequenceRepository extends JpaRepository<Sequence, Long> {

	List<Sequence> findByAccession(String accession);
	
	//@Query("select s from Sequence s where s.genotype = ?1")
	//Page<Sequence> findByGenotype(String genotype, Pageable pageable);
	
	//Page<Sequence> findByGenotype(String genotype, Pageable pageable);
}