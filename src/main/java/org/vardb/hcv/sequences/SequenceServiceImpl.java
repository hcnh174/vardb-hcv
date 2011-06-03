package org.vardb.hcv.sequences;

import java.util.Date;
import java.util.Iterator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("sequenceService")
@Transactional
public class SequenceServiceImpl implements SequenceService
{
	@Autowired private SequenceRepository repository;
	
	public void testRepository()
	{
		Sequence sequence;
		//Stopwatch stopwatch=new Stopwatch();
		//stopwatch.start();
		long start=(new Date()).getTime();
		for (int index=0;index<100000;index++)
		{
			sequence=new Sequence("abc"+index,"acgtcgtcatgcatagtc");
			sequence.setGenotype("1b");
			repository.save(sequence);
		}
		long elapsed=(new Date()).getTime()-start;
		System.out.println("elapsed: "+elapsed);
		
		/*
		user=new User("me");
		user.setLastname("Lastname");
		repository.save(user);
		
		user=new User("me2");
		user.setLastname("Lastname");
		repository.save(user);
		
		//Pageable pageable=new PageRequest(0,2);
		//Page<User> users=repository.findByLastname("Lastname",pageable);
		*/
		
		//for (Sequence cur : repository.findAll())
		for (Sequence cur : repository.findByAccession("abc51"))
		{
			System.out.println("sequence="+cur.toString());
		}
		
		Pageable pageable=new PageRequest(0,2);
		//Page page=repository.findByGenotype("1b",pageable);
		Page page=repository.findAll(pageable);
		System.out.println("pages.total="+page.getTotalPages());
		System.out.println("pages.size="+page.getSize());
		Iterator<Sequence> iter=page.iterator();
		while (iter.hasNext())
		{
			Sequence cur=iter.next();
			System.out.println("sequence="+cur.toString());
		}
		//repository.deleteAll();
		
	}
}