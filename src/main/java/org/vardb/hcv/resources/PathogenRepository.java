package org.vardb.hcv.resources;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

//@Transactional()
public interface PathogenRepository extends MongoRepository<Pathogen, String>
{
	List<Pathogen> findByName(String name);
	
	//@Query("select s from Sequence s where s.genotype = ?1")
	//Page<Sequence> findByGenotype(String genotype, Pageable pageable);
	
	//Page<Sequence> findByGenotype(String genotype, Pageable pageable);
}