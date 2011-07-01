package org.vardb.hcv.patients;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.document.mongodb.repository.MongoRepository;
import org.springframework.transaction.annotation.Transactional;

public interface PatientRepository extends MongoRepository<Patient, String>
{
	//Patient findByIdentifier(String identifier);
	//List<Patient> findByFirstname(String firstname);
}