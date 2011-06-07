package org.vardb.hcv.resources;

import java.util.Date;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.document.mongodb.MongoTemplate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("resourceService")
@Transactional
public class ResourceServiceImpl implements ResourceService
{
	@Autowired MongoTemplate mongoTemplate;
	@Autowired PathogenRepository pathogenRepository;
	
	public void testRepository()
	{
		Pathogen pathogen;
		long start=(new Date()).getTime();
		for (int index=0;index<100;index++)
		{
			pathogen=new Pathogen("pathogen"+index);
			pathogenRepository.save(pathogen);
		}
		long elapsed=(new Date()).getTime()-start;
		System.out.println("elapsed: "+elapsed);

		
		//for (Resource cur : repository.findAll())
		for (Pathogen cur : pathogenRepository.findByName("pathogen10"))
		{
			System.out.println("sequence="+cur.toString());
		}
		
		Pageable pageable=new PageRequest(0,2);
		Page page=pathogenRepository.findAll(pageable);
		System.out.println("pages.total="+page.getTotalPages());
		System.out.println("pages.size="+page.getSize());
		Iterator<Pathogen> iter=page.iterator();
		while (iter.hasNext())
		{
			Pathogen cur=iter.next();
			System.out.println("sequence="+cur.toString());
		}
		
		List<Pathogen> results = mongoTemplate.findAll(Pathogen.class);
		System.out.println("mongoTemplate: " + results);
	}
}