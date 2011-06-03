package org.vardb.hcv.web;

import java.util.Collection;
import java.util.Iterator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.vardb.hcv.sequences.Sequence;
import org.vardb.hcv.sequences.SequenceRepository;

import ch.ralscha.extdirectspring.annotation.ExtDirectMethod;
import ch.ralscha.extdirectspring.annotation.ExtDirectMethodType;
import ch.ralscha.extdirectspring.bean.ExtDirectStoreReadRequest;
import ch.ralscha.extdirectspring.bean.ExtDirectStoreResponse;

import com.google.inject.internal.Lists;

@Component
public class HcvDirect
{
	//@Resource(name="userService") private UserService userService;	
	
	@Autowired private SequenceRepository repository;
	
	@ExtDirectMethod
	public String doEcho(String message) {
		return message;
	}

	@ExtDirectMethod(ExtDirectMethodType.STORE_READ)
	public ExtDirectStoreResponse<Sequence> loadWithPaging(ExtDirectStoreReadRequest request)
	{
		int pagenum=request.getPage();
		int size=request.getLimit();
		Pageable pageable=new PageRequest(pagenum,size);
		//Page page=repository.findByGenotype("1b",pageable);
		Page page=repository.findAll(pageable);
		System.out.println("pages.total="+page.getTotalPages());
		System.out.println("pages.size="+page.getSize());
		Iterator<Sequence> iter=page.iterator();
		Collection<Sequence> sequences=Lists.newArrayList();
		while (iter.hasNext())
		{
			Sequence sequence=iter.next();
			System.out.println("sequence="+sequence.toString());
			sequences.add(sequence);
		}
		
		return new ExtDirectStoreResponse<Sequence>((int)page.getTotalElements(),sequences);
	}
	
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
