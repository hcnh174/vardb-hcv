package org.vardb.hcv;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.dao.annotation.PersistenceExceptionTranslationPostProcessor;
import org.springframework.data.document.mongodb.MongoFactoryBean;
import org.springframework.data.document.mongodb.MongoTemplate;

import com.mongodb.Mongo;


@Configuration
public class AppConfig {

	public @Bean MongoTemplate mongoTemplate(Mongo mongo) {
		MongoTemplate mongoTemplate = new MongoTemplate(mongo, "test");
		return mongoTemplate;
	}

	public @Bean MongoFactoryBean mongo() {
		MongoFactoryBean mongo = new MongoFactoryBean();
		//mongo.setHost("localhost");
		mongo.setHost("127.0.0.1");
		return mongo;
	}

	// Use this post processor to translate any MongoExceptions thrown in @Repository annotated classes
	public @Bean PersistenceExceptionTranslationPostProcessor persistenceExceptionTranslationPostProcessor() {
		return new PersistenceExceptionTranslationPostProcessor();
	}
	
	
	/*
     public @Bean MongoFactoryBean mongo() {
          MongoFactoryBean mongo = new MongoFactoryBean();
          mongo.setHost("localhost");
          return mongo;
     }

     public @Bean MongoDbFactory mongoDbFactory() throws Exception
     {
    	 UserCredentials userCredentials = new UserCredentials("joe", "secret");
    	 return new SimpleMongoDbFactory(new Mongo(), "database", userCredentials);
     }

     public @Bean MongoTemplate mongoTemplate() throws Exception
     {
    	 return new MongoTemplate(mongoDbFactory());
     }
     */
     
	/*
     public @Bean Mongo mongo() throws Exception {
         return new Mongo("localhost");
     }
     
     public @Bean MongoTemplate mongoTemplate() throws Exception {
         return new MongoTemplate(mongo(), "hcv");
     }
     	*/
     
	
	/*
     public @Bean MongoTemplate mongoTemplate(Mongo mongo)
     {
    	 MongoTemplate mongoTemplate = new MongoTemplate(mongo, "hcv");
    	 return mongoTemplate;
	 }

	
	 public @Bean MongoFactoryBean mongo()
	 {
		 MongoFactoryBean mongo = new MongoFactoryBean();
		 mongo.setHost("localhost");
		 return mongo;
	 }

	 public @Bean PersistenceExceptionTranslationPostProcessor persistenceExceptionTranslationPostProcessor()
	 {
		 return new PersistenceExceptionTranslationPostProcessor();
	 }
	*/

}