package org.vardb.hcv.resources;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.document.mongodb.repository.MongoRepository;
import org.springframework.transaction.annotation.Transactional;

//@Transactional()
public interface PathogenRepository extends MongoRepository<Pathogen, String>
{
	List<Pathogen> findByName(String name);
	
	//@Query("select s from Sequence s where s.genotype = ?1")
	//Page<Sequence> findByGenotype(String genotype, Pageable pageable);
	
	//Page<Sequence> findByGenotype(String genotype, Pageable pageable);
}