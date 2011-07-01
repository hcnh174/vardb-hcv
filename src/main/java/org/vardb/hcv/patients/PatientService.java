package org.vardb.hcv.patients;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly=false)
public interface PatientService
{
	public void loadTestData();
	public List<Patient> testRepository();
}
