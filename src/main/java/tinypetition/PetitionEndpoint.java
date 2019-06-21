package tinypetition;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import tinypetition.Payload;
import tinypetition.Petition;
import tinypetition.PaginatedPayload;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.response.UnauthorizedException;
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
import com.google.appengine.api.users.User;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Query.FilterOperator;


@Api(name = "petapi",
version = "v1",
namespace = @ApiNamespace(ownerDomain = "helloworld.example.com",
    ownerName = "helloworld.example.com",
    packagePath = ""))
public class PetitionEndpoint {
	/*
	 * Classe GAE qui contient les méthodes l'API pour les pétitions
	 */
	
	@ApiMethod(name = "addPetition",
			path="add",
			httpMethod = ApiMethod.HttpMethod.POST,
			audiences = {"291345575082-jlkqvkonrhife55l1al4o3af2vb9jvrs.apps.googleusercontent.com"},//ICI
			clientIds = {"291345575082-jlkqvkonrhife55l1al4o3af2vb9jvrs.apps.googleusercontent.com"}
			
			)
	public Entity addPetition(User user, Petition incomepetition)  throws UnauthorizedException{
		/*
		 * Methode qui permet d'ajouter une pétition
		 * @param user object injecté par GAE
		 * @param incomepetition un JSON envoyé par le client javascript représentant un objet petition
		 * @return la pétiton qui vient d'être ajoutée
		 */
		  if (user == null) {
		      throw new UnauthorizedException("Invalid credentials");
		    }
		Entity petition = new Entity("Petition",incomepetition.name);
		petition.setProperty("name", incomepetition.name);
		petition.setProperty("owner",incomepetition.owner);
		petition.setProperty("description", incomepetition.description);
		petition.setProperty("total",1);
		petition.setProperty("currentIndex", 1);
		Entity petitionIndex = new Entity("PetitionIndex","index"+1,petition.getKey());
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
			httpMethod = ApiMethod.HttpMethod.POST,
			audiences = {"291345575082-jlkqvkonrhife55l1al4o3af2vb9jvrs.apps.googleusercontent.com"}, //ICI
			clientIds = {"291345575082-jlkqvkonrhife55l1al4o3af2vb9jvrs.apps.googleusercontent.com"}
			)
	public Entity getPetition( Petition inPetition) throws EntityNotFoundException, UnauthorizedException{
		/*
		 * Methode qui permet de retrieve une pétition 
		 * @param inPetition un JSON envoyé par le client javascript représentant un objet petition
		 * @param user object injecté par GAE
		 */
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		Key petitionKey = KeyFactory.createKey("Petition", inPetition.name);
		Entity outPetition = datastore.get(petitionKey);
		return outPetition;
	}
	
	@ApiMethod(name ="signPetition",
			path="sign",
			httpMethod = ApiMethod.HttpMethod.POST
			)
	public Entity signPetition(Payload payload) throws EntityNotFoundException, UnauthorizedException {
		/*
		 * Methode qui permet de signer une pétition
		 * @param user object injecté par GAE
		 * @param payload un JSON envoyé par le client javascript représentant un objet payload
		 * @return la petition qui vient d'être signée
		 */
		Entity petition;
		Key petitionKey = KeyFactory.createKey("Petition", payload.petitionName);
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		Filter propertyFilter = new FilterPredicate("signataires", FilterOperator.EQUAL, payload.userName);
		Query q = new Query("PetitionIndex").setFilter(propertyFilter).setAncestor(petitionKey);
		List<Entity> results = datastore.prepare(q).asList(FetchOptions.Builder.withDefaults());
		if(results.isEmpty()) {
			Transaction txn = datastore.beginTransaction();
			try {
				petition = datastore.get(petitionKey);
				long total = (long)petition.getProperty("total");
				total ++;
				petition.setProperty("total", total);
				long currentIndex = (long)petition.getProperty("currentIndex");
				Key petitionIndexKey = KeyFactory.createKey(petitionKey,"PetitionIndex", "index"+currentIndex);
				Entity petitionIndex = datastore.get(petitionIndexKey);
				long nb = (long)petitionIndex.getProperty("nb");
				if(nb==20000) {
					long newIndex = currentIndex + 1;
					petition.setProperty("currentIndex", newIndex);
					petitionIndex = new Entity("PetitionIndex","index"+newIndex,petition.getKey());
					ArrayList<String> signataires = new ArrayList<String>();
					signataires.add(payload.userName);
					petitionIndex.setProperty("nb",1);
				}
				else {
					nb++;
					@SuppressWarnings("unchecked")
					ArrayList<String> retrievedSignataires = (ArrayList<String>) petitionIndex.getProperty("signataires");
					retrievedSignataires.add(payload.userName);
					petitionIndex.setProperty("signataires", retrievedSignataires);
					petitionIndex.setProperty("nb", nb);
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
		else {
			throw new UnauthorizedException("user already signed");
			
		}
		return petition;
	}
	
	@ApiMethod(name ="getListByUserName",
			path="ListByUserName",
			httpMethod = ApiMethod.HttpMethod.POST
			)
	public List<Entity> getListByUserName(Payload payload){
		/*
		 * Methode qui permet de retrieve la liste des petitions d'un user
		 * @param payload un JSON envoyé par le client javascript représentant un objet payload
		 * @return liste de pétitions
		 */
		
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
			path="top100",
			httpMethod = ApiMethod.HttpMethod.GET
			)
	public List<Entity> getTop100(){
		/*
		 * Methode qui permet de retrieve le top 100 des pétitions
		 * @return la list des 100 petitions triées par total de signatures
		 */
		
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		Query q = new Query("Petition").addSort("total", SortDirection.DESCENDING);
		List<Entity> results = datastore.prepare(q).asList(FetchOptions.Builder.withLimit(100));
		return results;
		
	}
	@ApiMethod(name ="allPetition",
			path="all",
			httpMethod = ApiMethod.HttpMethod.POST
			)
	
	public PaginatedPayload allPetition(PaginatedPayload params){
		/*
		 * Methode qui permet de retrieve la liste des petitions d'un user
		 * @param params un JSON envoyé par le client javascript représentant un objet PaginatedPayload
		 * utilisé pour savoir qu'elle est la dernière clef pour le filtre
		 * @return un objet params qui contient la lsite des pétitions et la dernière clef
		 */
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		Query q;
		if(params.lastKey.length() == 0) {
			q = new Query("Petition");
			
		}
		else {
			Key petitionKey = KeyFactory.createKey("Petition", params.lastKey);
			Filter keyFilter = new FilterPredicate(Entity.KEY_RESERVED_PROPERTY, FilterOperator.GREATER_THAN, petitionKey);
				
			q = new Query("Petition").setFilter(keyFilter);
	
		}
		params.petitions = datastore.prepare(q).asList(FetchOptions.Builder.withLimit(10));
		return params;
	}
	
}


