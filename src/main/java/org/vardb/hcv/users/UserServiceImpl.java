package org.vardb.hcv.users;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("userService")
@Transactional
public class UserServiceImpl implements UserService
{
	private static final String EMAIL_PASSWORD_TEMPLATE="templates/password.ftl";
	private static final String NEWUSER_EMAIL_TEMPLATE="templates/newuser.ftl";
	
	//@Resource(name="emailService") private EmailService emailService;	
	//@Resource(name="passwordEncoder") private ShaPasswordEncoder passwordEncoder;
	//@Resource(name="saltSource") private ReflectionSaltSource saltSource;

	//@Resource(name = "loginService") private LoginService loginService;
	
	//@Autowired private UserRepository repository;
		
	//public void setEmailService(final EmailService emailService){this.emailService=emailService;}
	//public void setRecaptcha(final ReCaptchaImpl recaptcha){this.recaptcha=recaptcha;}
	//public void setLoginService(final LoginService loginService){this.loginService=loginService;}
	
	/*
	@Override
	//@Cacheable("users")
	public UserDetails loadUserByUsername(String username)
	{
		User user=findUserByUsername(username);
		if (user==null)
			throw new UsernameNotFoundException(username);
		return user;
	}
	
	public User findUserByUsername(String username)
	{
		User user=repository.findByUsername(username).iterator().next();
		if (user==null)
			return null;
		return user;
	}
	*/
	
	/*
	@Override
	//@Cacheable("users")
	public UserDetails loadUserByUsername(String username)
	{
		//System.out.println("looking up user");
		//ThreadHelper.sleep(5000);
		User user=findUserByUsername(username);
		if (user==null)
			throw new UsernameNotFoundException(username);
		return user;
	}
	
	public User findUserByUsername(String username)
	{
		User user=User.findUsersByUsername(username).getSingleResult();
		if (user==null)
			return null;
		return user;
	}
	
	public User findOrCreateUser(String username)
	{
		User user=findUserByUsername(username);
		if (user==null)
		{
			user=new User(username);
			user.persist();			
		}
		return user;
	}
	
	// check if the username either doesn't already exist or already belongs to the current user
	public boolean validateUsername(String username)
	{
		if (!usernameExists(username))
		{
			System.out.println("username does not exist - okay to use: "+username);
			return true;
		}
		System.out.println("username already in use - not okay to use: "+username);
		//User user=getDao().getUserById(user_id);
		// okay if no user with this user_id exists, or the username belongs to this user_id
		//if (user!=null && user.getUsername().equals(username))
		//	return true;
		return false;
	}
	
	public boolean usernameExists(String username)
	{
		User user=User.findUsersByUsername(username).getSingleResult();
		return (user!=null);
	}
	
	public void createAccount(User user)
	{
		//user.setPassword(encodePassword(user.getPassword()));
		user.persist();
		sendNewUserEmail(user);
	}

	private void sendNewUserEmail(User user)
	{
		String subject="varDB new user alert: "+user.getName();
		SimpleMailMessage message=new SimpleMailMessage();
		message.setTo(user.getEmail());
		//message.setTo(CStringHelper.convertToArray(this.emailAddresses));
		message.setSubject(subject);
		this.emailService.sendEmail(message,NEWUSER_EMAIL_TEMPLATE,"user",user);
	}
	
	public void updateUser(User user)
	{
		user.merge();
	}
	
	public void addUsers(Collection<User> users)
	{
		for (User user : users)
		{
			user.merge();
		}
	}
	
	public List<User> getUsers()
	{
		return User.findAllUsers();
	}
	
	public void resetPassword(Long id, String password)
	{
		User user=User.findUser(id);
		setPassword(user,password);
		//user.setPassword(encodePassword(password));
		user.merge();
	}	
	
	public void emailPassword(String username)
	{
		User user=getDao().findUserByUsername(username);		
		SimpleMailMessage message=new SimpleMailMessage();
		message.setTo(user.getEmail());
		message.setSubject("varDB account details");
		this.emailService.sendEmail(message,EMAIL_PASSWORD_TEMPLATE,"user","username",username,"password",user.getPassword());
	}
	
	
	// @TODO log password change
	public void changePassword(Long id, String password)
	{
		User user=User.findUser(id);
		setPassword(user,password);
		//user.setPassword(encodePassword(password));
		user.merge();
	}
	
	//////////////////////////////////////////////////////////////

	public void setPassword(User user, String password)
	{
		user.setPassword(password, passwordEncoder, saltSource);
	}
	
	//////////////////////////////////////////////////
	
	public List<User> exportUsers()
	{
		return User.findAllUsers();
	}
	
	public User loadUser(Element node)
	{
		CBeanHelper beanhelper=new CBeanHelper();
		//String user_id=CDom4jHelper.getAttribute(node,"id");
		String username=CDom4jHelper.getAttribute(node,"username");
		User user=findOrCreateUser(username);
		for (Iterator<?> iter=node.elementIterator();iter.hasNext();)
		{
			Element child=(Element)iter.next();
			String name=child.getName();
			String text=CDom4jHelper.getTrimmedText(child);
			if ("created".equals(name))
				user.setCreated(CDateHelper.parse(text,CDateHelper.MMDDYYYY_PATTERN));
			//else if ("password".equals(name))
			//	setPassword(user,CStringHelper.decodeBase64(text));
			else beanhelper.setPropertyFromString(user,name,text);
		}
		user.merge();
		return user;
	}
	
	///////////////////////////////////////////////////////
	

	public void testUserRepository()
	{
		User user;
		
		for (int index=0;index<100;index++)
		{
			user=new User("abc"+index);
			user.setLastname(CStringHelper.getRandomWord(5,10));
			System.out.println("lastname="+user.getLastname());
			repository.save(user);
		}
		user=new User("me");
		user.setLastname("Lastname");
		repository.save(user);
		
		user=new User("me2");
		user.setLastname("Lastname");
		repository.save(user);
		
		//Pageable pageable=new PageRequest(0,2);
		//Page<User> users=repository.findByLastname("Lastname",pageable);
		
		//for (User curuser : repository.findAll())
		for (User curuser : repository.findByLastname("Lastname"))
		{
			System.out.println("user="+user.toString());
		}
		repository.deleteAll();
	}
	*/
}