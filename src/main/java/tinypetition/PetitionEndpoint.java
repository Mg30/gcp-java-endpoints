package tinypetition;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import tinypetition.Payload;
import tinypetition.Petition;
import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.ApiMethod;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.EntityNotFoundException;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.FilterPredicate;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.api.datastore.Transaction;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Query.FilterOperator;
import java.util.UUID;


@Api(name = "petapi",
version = "v1",
namespace = @ApiNamespace(ownerDomain = "helloworld.example.com",
    ownerName = "helloworld.example.com",
    packagePath = ""))
public class PetitionEndpoint {
	
	@ApiMethod(name = "addPetition",
			httpMethod = ApiMethod.HttpMethod.POST)
	public Entity addPetition(Petition incomepetition) {
		String uuid = UUID.randomUUID().toString();
		uuid.replace("-", "");
		Entity petition = new Entity("Petition",incomepetition.name);
		petition.setProperty("name", incomepetition.name);
		petition.setProperty("owner",incomepetition.owner);
		petition.setProperty("description", incomepetition.description);
		petition.setProperty("total",1);
		petition.setProperty("currentIndex", uuid);
		Entity petitionIndex = new Entity("PetitionIndex",uuid,petition.getKey());
		ArrayList<String> signataires = new ArrayList<String>();
		signataires.add(incomepetition.owner);
		petitionIndex.setProperty("signataires", signataires);
		petitionIndex.setProperty("nb",1);
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		datastore.put(petition);
		datastore.put(petitionIndex);
		return petition;
	}
	
	@ApiMethod(name ="getPetition",
			httpMethod = ApiMethod.HttpMethod.POST
			)
	public Entity getPetition(Petition inPetition) throws EntityNotFoundException {
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		Key petitionKey = KeyFactory.createKey("Petition", inPetition.name);
		Entity outPetition = datastore.get(petitionKey);
		return outPetition;
	}
	
	@ApiMethod(name ="signPetition",
			httpMethod = ApiMethod.HttpMethod.POST
			)
	public void signPetition(Payload payload) throws EntityNotFoundException {
		Key petitionKey = KeyFactory.createKey("Petition", payload.petitionName);
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		Filter propertyFilter = new FilterPredicate("signataires", FilterOperator.EQUAL, payload.userName);
		Query q = new Query("PetitionIndex").setFilter(propertyFilter).setAncestor(petitionKey);
		List<Entity> results = datastore.prepare(q).asList(FetchOptions.Builder.withDefaults());
		if(results.isEmpty()) {
			Transaction txn = datastore.beginTransaction();
			try {
				Entity petition = datastore.get(petitionKey);
				long total = (long)petition.getProperty("total");
				total ++;
				petition.setProperty("total", total);
				String currentIndex = (String)petition.getProperty("currentIndex");
				Key petitionIndexKey = KeyFactory.createKey(petitionKey,"PetitionIndex", currentIndex);
				Entity petitionIndex = datastore.get(petitionIndexKey);
				long nb = (long)petitionIndex.getProperty("nb");
				if(nb==4999) {
					String uuid = UUID.randomUUID().toString();
					uuid.replace("-", "");
					petition.setProperty("currentIndex", uuid);
					petitionIndex = new Entity("PetitionIndex",uuid,petition.getKey());
					ArrayList<String> signataires = new ArrayList<String>();
					signataires.add(payload.userName);
					petitionIndex.setProperty("nb",0);
				}
				else {
					 @SuppressWarnings("unchecked")
					  ArrayList<String> retrievedSignataires = (ArrayList<String>) petitionIndex.getProperty("signataires");
					  retrievedSignataires.add(payload.userName);
					  petitionIndex.setProperty("signataires", retrievedSignataires);
				}
				datastore.put(txn,petition);
				datastore.put(txn, petitionIndex);
			    txn.commit();
			} finally {
			  if (txn.isActive()) {
			    txn.rollback();
			  }
			}
			
		}

		
	}
	
	@ApiMethod(name ="getListByUserName",
			httpMethod = ApiMethod.HttpMethod.POST
			)
	public List<Entity> getListByUserName(Payload payload){
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		Filter propertyFilter = new FilterPredicate("signataires", FilterOperator.EQUAL, payload.userName);
		Query q = new Query("PetitionIndex").setFilter(propertyFilter);
		List<Entity> indexes = datastore.prepare(q).asList(FetchOptions.Builder.withDefaults());
		List<Key> petitionKeys = new ArrayList<Key>();
		for (Entity i : indexes) {
			petitionKeys.add(i.getParent());
		}
		
		Map<Key, Entity> retrievedPetitions = datastore.get(petitionKeys);
		List<Entity> petitions = new ArrayList<Entity>();
		retrievedPetitions.forEach((key, value) -> {
		   petitions.add(value);
		});
		
		return petitions;
	}
	
	@ApiMethod(name ="getTop100",
			httpMethod = ApiMethod.HttpMethod.GET
			)
	public List<Entity> getTop100(){
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		Query q = new Query("Petition").addSort("total", SortDirection.DESCENDING);
		List<Entity> results = datastore.prepare(q).asList(FetchOptions.Builder.withLimit(100));
		return results;
		
	}
	
	
}


