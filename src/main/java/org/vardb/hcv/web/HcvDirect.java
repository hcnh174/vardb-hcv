package org.vardb.hcv.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.vardb.hcv.sequences.Comment;
import org.vardb.hcv.sequences.CommentRepository;
import org.vardb.hcv.sequences.Sequence;
import org.vardb.hcv.sequences.SequenceRepository;
import org.vardb.hcv.sequences.Term;
import org.vardb.hcv.sequences.TermRepository;
import org.vardb.util.ExtDirectHelper;

import ch.ralscha.extdirectspring.annotation.ExtDirectMethod;
import ch.ralscha.extdirectspring.annotation.ExtDirectMethodType;
import ch.ralscha.extdirectspring.bean.ExtDirectStoreReadRequest;
import ch.ralscha.extdirectspring.bean.ExtDirectStoreResponse;

import com.google.common.collect.Lists;

@Component
public class HcvDirect
{
	//@Resource(name="userService") private UserService userService;	
	
	@Autowired private SequenceRepository sequenceRepository;
	@Autowired private TermRepository termRepository;
	@Autowired private CommentRepository commentRepository;
	
	@ExtDirectMethod
	public String doEcho(String message) {
		return message;
	}

	 @ExtDirectMethod(ExtDirectMethodType.STORE_READ)
	 public ExtDirectStoreResponse<Sequence> loadWithPaging(ExtDirectStoreReadRequest request)
	 {
		 //preloadSequences();		 
		 Pageable pageable=ExtDirectHelper.getPageable(request);
		 Page<Sequence> page=sequenceRepository.findAll(pageable);
		 return ExtDirectHelper.getResponse(page);
		 //return new ExtDirectStoreResponse<Sequence>((int)page.getTotalElements(),page.getContent());
	 }
	 
	 
	 @ExtDirectMethod
	 public Term getTerm(String identifier)
	 {
		 termRepository.save(new Term(identifier));
		 Term term=termRepository.findByIdentifier(identifier);
		 return term;
		 //return CStringHelper.createMap("term",term, "definition","definition of "+term);
	 }
	 
	 @ExtDirectMethod(ExtDirectMethodType.STORE_READ)
	 public ExtDirectStoreResponse<Comment> getComments(ExtDirectStoreReadRequest request)
	{
		 //preloadComments();
		 Pageable pageable=ExtDirectHelper.getPageable(request);
		 System.out.println("request.query="+request.getQuery());
		 //List<Comment> comments=commentRepository.findByTypeAndIdentifier(type, identifier);
		 Page<Comment> page=commentRepository.findAll(pageable);
		 return ExtDirectHelper.getResponse(page);
	}
	 
	
	 @ExtDirectMethod(ExtDirectMethodType.STORE_READ)
	 public List<IdLabel> getGenotypes()//ExtDirectStoreReadRequest request)
	 {
		 List<IdLabel> genotypes=Lists.newArrayList();
		 genotypes.add(new IdLabel("1a","HCV genotype 1a"));
		 genotypes.add(new IdLabel("1b","HCV genotype 1b"));
		 genotypes.add(new IdLabel("2a","HCV genotype 2a"));
		 genotypes.add(new IdLabel("2b","HCV genotype 2b"));
		 genotypes.add(new IdLabel("3","HCV genotype 3"));
		 return genotypes;
		 //return new ExtDirectStoreResponse<IdLabel>(genotypes);
	 }
	 
	 public static class IdLabel
	 {
		 private String id;
		 private String label;
		 
		 public IdLabel(String id, String label)
		 {
			 this.id=id;
			 this.label=label;
		 }
		 
		 public String getId(){return this.id;}
		 public String getLabel(){return this.label;}
	 }
	 
	 ////////////////////////////////////////////////
	 
	 private void preloadSequences()
	 {
		 for (int index=0;index<1000;index++)
		 {
			 Sequence sequence=new Sequence("abc"+index,"acgtcgtcatgcatagtc");
			 sequence.setGenotype("1b");
			 sequenceRepository.save(sequence);
		 }
	 }
	 
	 private void preloadComments()
	 {
		 for (int index=0;index<100;index++)
		 {
			 Comment comment=new Comment("cnh1","PAGE","homepage","First?");
			 commentRepository.save(comment);
		 }
	 }
	 
	 /*
	@ExtDirectMethod(ExtDirectMethodType.STORE_READ)
	public ExtDirectStoreResponse<Sequence> loadWithPaging(ExtDirectStoreReadRequest request)
	{
		System.out.println("received request: "+request.toString());
		System.out.println("pagenum: "+request.getPage());
		System.out.println("size: "+request.getLimit());
		int pagenum=request.getPage();
		int size=request.getLimit();
		Collection<Sequence> sequences=Lists.newArrayList();
		
		Pageable pageable=new PageRequest(pagenum,size);
		//Page page=repository.findByGenotype("1b",pageable);
		Page page=repository.findAll(pageable);
		System.out.println("pages.total="+page.getTotalPages());
		System.out.println("pages.size="+page.getSize());
		System.out.println("pages.elements="+page.getTotalElements());
		
		Iterator<Sequence> iter=page.iterator();
		while (iter.hasNext())
		{
			Sequence sequence=iter.next();
			System.out.println("sequence="+sequence.toString());
			sequences.add(sequence);
		}
		return new ExtDirectStoreResponse<Sequence>((int)page.getTotalElements(),sequences);
		//return new ExtDirectStoreResponse<Sequence>(0,sequences);
	}
	*/
	 
	/*
	@ExtDirectMethod(ExtDirectMethodType.STORE_READ)
	public ExtDirectStoreResponse<Sequence> loadWithPaging(ExtDirectStoreReadRequest request)
	{
		System.out.println("received request: "+request.toString());
		System.out.println("pagenum: "+request.getPage());
		System.out.println("size: "+request.getLimit());
		int pagenum=request.getPage();
		int size=request.getLimit();
		Collection<Sequence> sequences=Lists.newArrayList();
		
		Pageable pageable=new PageRequest(pagenum,size);
		//Page page=repository.findByGenotype("1b",pageable);
		Page page=repository.findAll(pageable);
		System.out.println("pages.total="+page.getTotalPages());
		System.out.println("pages.size="+page.getSize());
		System.out.println("pages.elements="+page.getTotalElements());
		
		Iterator<Sequence> iter=page.iterator();
		while (iter.hasNext())
		{
			Sequence sequence=iter.next();
			System.out.println("sequence="+sequence.toString());
			sequences.add(sequence);
		}
		return new ExtDirectStoreResponse<Sequence>((int)page.getTotalElements(),sequences);
		//return new ExtDirectStoreResponse<Sequence>(0,sequences);
	}
	*/
	
	
	/*
	@ExtDirectMethod
	public UserDetails getUserCached(String username) {
		Stopwatch stopwatch=new Stopwatch();
		stopwatch.start();
		UserDetails user=userService.loadUserByUsername(username);
		System.out.println("finished: "+stopwatch.stop()+" milliseconds");
		return user;
	}
	
	@ExtDirectMethod
	public Map<String, Object> getTerm(String term) {
		return CStringHelper.createMap("term",term, "definition","definition of "+term);
	}
	
	@ExtDirectMethod(ExtDirectMethodType.STORE_READ)
	public ExtDirectStoreResponse<Sequence> loadSequences(ExtDirectStoreReadRequest request) {
		int start=request.getStart();
		int limit=request.getLimit();
		int total=(int)Sequence.countSequences();
		List<Sequence> sequences=Sequence.findSequenceEntries(start, limit);
		return new ExtDirectStoreResponse<Sequence>(total,sequences);
	}
	
	@ExtDirectMethod(ExtDirectMethodType.STORE_READ)
	public ExtDirectStoreResponse<Comment> loadComments(ExtDirectStoreReadRequest request) {
		int start=request.getStart();
		int limit=request.getLimit();
		int total=(int)Comment.countComments();
		List<Comment> sequences=Comment.findCommentEntries(start, limit);
		return new ExtDirectStoreResponse<Comment>(total,sequences);
	}
	
	@ExtDirectMethod
	public String submitComment(String type, String identifier, String text, Principal user) {
		String username=user==null ? "anonymous" : user.getName();
		Comment comment=new Comment(username,type,identifier,text);
		comment.persist();
		return "comment submitted";
	}
	
	/////////////////////////////////////////////////////////////
	
	@ExtDirectMethod
	public void validateUsername(Model model, HttpServletResponse response,
			@RequestParam("field") String field,
			@RequestParam("value") String value)
	{
		if (!"username".equals(field))
			throw new CException("expecting field=username. found field="+field);
		boolean success=userService.validateUsername(value.trim());
		String reason=(success) ? "" : "Username already exists";
		CWebHelper.jsonSuccess(response,"valid",success,"reason",reason);
	}
	
	@ExtDirectMethod(ExtDirectMethodType.FORM_LOAD)
	public UserForm getNewUserForm()
	{
		UserForm form=new UserForm();
		return form;
	}
	
	@ExtDirectMethod(ExtDirectMethodType.FORM_POST)
	//@ResponseBody
	@RequestMapping(value="/postNewUserForm", method = RequestMethod.POST) 
	public @ResponseBody ExtDirectResponse postNewUserForm(HttpServletRequest request, @Valid UserForm form, BindingResult result)
	{
		if (!result.hasErrors())
		{
			if (!userService.validateUsername(form.getUsername()))
			{
				result.rejectValue("username", null, "username already taken");
			}
		}
	
		ExtDirectResponseBuilder builder = new ExtDirectResponseBuilder(request);
		builder.addErrors(result);
		return builder.build();
	}

	public static class UserForm
	{
		protected String username="";
		protected String password1="";
		protected String password2="";
		protected String firstname="";
		protected String lastname="";
		protected String email="";
		protected String affiliation="";
		
		public String getUsername(){return this.username;}
		public void setUsername(String username){this.username=username;}

		public String getPassword1(){return this.password1;}
		public void setPassword1(String password1){this.password1=password1;}

		public String getPassword2(){return this.password2;}
		public void setPassword2(String password2){this.password2=password2;}

		public String getFirstname(){return this.firstname;}
		public void setFirstname(String firstname){this.firstname=firstname;}

		public String getLastname(){return this.lastname;}
		public void setLastname(String lastname){this.lastname=lastname;}

		public String getEmail(){return this.email;}
		public void setEmail(String email){this.email=email;}

		public String getAffiliation(){return this.affiliation;}
		public void setAffiliation(String affiliation){this.affiliation=affiliation;}
		
		public boolean passwordsMatch()
		{
			return this.password1.equals(this.password2);
		}

		public String getPassword()
		{
			return this.password1;
		}

	}
	*/		
}
