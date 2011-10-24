package org.vardb.hcv.patients;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface PatientRepository extends MongoRepository<Patient, String>
{
	//Patient findByIdentifier(String identifier);
	//List<Patient> findByFirstname(String firstname);
}