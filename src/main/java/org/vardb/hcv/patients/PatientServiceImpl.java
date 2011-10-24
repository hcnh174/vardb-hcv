package org.vardb.hcv.patients;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("patientService")
@Transactional
public class PatientServiceImpl implements PatientService
{
	@Autowired MongoOperations mongoTemplate;
	@Autowired PatientRepository patientRepository;
	
	public void loadTestData()
	{
		//mongoTemplate..deleteAll();
	
		long start=(new Date()).getTime();
		for (int index=0;index<100;index++)
		{
			Patient patient=new Patient("patient"+index);
			patient.setFirstname("ネルソン");
			mongoTemplate.save(patient);
			//patientRepository.save(patient);
		}
		long elapsed=(new Date()).getTime()-start;
		System.out.println("elapsed: "+elapsed);
	}
	
	
	public List<Patient> testRepository()
	{	
		//loadTestData();
		
		/*
		for (Patient cur : patientRepository.findByFirstname("ネルソン"))
		{
			System.out.println("patient="+cur.toString());
		}
		*/
		
		/*
		Pageable pageable=new PageRequest(0,2);
		Page page=patientRepository.findAll(pageable);
		System.out.println("pages.total="+page.getTotalPages());
		System.out.println("pages.size="+page.getSize());
		Iterator<Patient> iter=page.iterator();
		while (iter.hasNext())
		{
			Patient cur=iter.next();
			System.out.println("patient="+cur.toString());
			CFileHelper.appendFile("c:/temp/patients.txt",cur.toString());
		}
		
		List<Patient> results = mongoTemplate.findAll(Patient.class);
		System.out.println("mongoTemplate: " + results);
		*/
		List<Patient> results = mongoTemplate.findAll(Patient.class);
		return results;
	}
}