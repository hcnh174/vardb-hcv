package org.vardb.hcv.web;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.vardb.hcv.patients.Patient;
import org.vardb.hcv.patients.PatientService;
import org.vardb.util.CWebHelper;

@Controller
public class HcvController {
	
	/*
	@Autowired private CommentRepository commentRepository;
	@Autowired private FeedbackRepository feedbackRepository;
	@Autowired private PageRepository pageRepository;
	*/
	@Autowired private PatientService patientService;
	//@Autowired private PatientRepository patientRepository;
	
	@RequestMapping("/")
    public String dflt(Model model) {
        return "index";
    }
	
	@RequestMapping("/index")
    public String index(Model model) {
		return "index";
    }
	
	@RequestMapping("/explorer")
    public String explorer(Model model) {
        return "explorer";
    }
	
	@RequestMapping("/patients")
    public String patients(Model model) {
        return "patients";
    }
	
	////////////////////////////////////////
	
	@RequestMapping("/patients/preload")
    public void patientsPreload( HttpServletResponse response)
    		//@RequestParam(value="identifier", required=false, defaultValue="patient10") String identifier)
	{
		patientService.loadTestData();
		CWebHelper.write(response, "loaded test data");
    }
	
	@RequestMapping("/patients/ajax")
    public void patientsAjax( HttpServletResponse response)
    		//@RequestParam(value="identifier", required=false, defaultValue="patient10") String identifier)
	{
		//Patient patient=patientRepository.findByIdentifier(identifier);
		List<Patient> patients=patientService.testRepository();
		json(response,"total",patients.size(),"records",patients);
    }
	
	////////////////////////////////////////////////////////
	
    @RequestMapping(value = "/contact", method = RequestMethod.GET)
	public String contact(Model model)
	{
		return "contact";
	}

    /*
	@RequestMapping(value = "/contact", method = RequestMethod.POST)
	public String contactSubmitted(Model model,
			@RequestParam("name") String name,
			@RequestParam("affiliation") String affiliation,
			@RequestParam("email") String email,
			@RequestParam("purpose") String purpose,
			@RequestParam("comments") String comments)
	{
		Feedback feedback=new Feedback(name, affiliation, email, purpose, comments);
		feedbackRepository.save(feedback);
		return "thankyou";
	}
	*/
    
	/////////////////////////////////////////////////////////////
	
	
	@RequestMapping("/announcements.xml")
	public void announcementsRss(HttpServletResponse response)
	{
		response.setContentType(CWebHelper.ContentType.XML);
		String rssFeed="http://groups.google.com/group/vardb-announce/feed/rss_v2_0_msgs.xml";
		int rssMax=10;
		CWebHelper.write(response,CWebHelper.readRss(rssFeed,rssMax));
	}
	
	//////////////////////////////////////////////////////////////
	
	
	/*	
	@RequestMapping(value="/ajax/comments.json")
	public void comments(Model model, HttpServletResponse response,
			@RequestParam("type") String type,
			@RequestParam("identifier") String identifier,
			@RequestParam(value="start", required=false, defaultValue="0") Integer start,
			@RequestParam(value="limit", required=false, defaultValue="10") Integer limit)
	{
		Pageable paging=new PageRequest(start,limit);
		int total=(int)Comment.countComments();
		List<Comment> comments=commentRepository.findByTypeAndIdentifier(type, identifier);
		json(response,"total",total,"records",comments);
	}
	*/
	
	///////////////////////////////////////////////////////////////////
		
	/*
	@RequestMapping(value="/pages/{identifier}")
	public String page(Model model, HttpServletResponse response,
			@PathVariable String identifier)
	{
		Page page=pageRepository.findByIdentifier(identifier);
		model.addAttribute("page", page);
		return "page";
	}
	*/
	
	/////////////////////////////////////////
	
	protected String json(HttpServletResponse response, Object... args)
	{
		return CWebHelper.json(response,args);
	}
}
