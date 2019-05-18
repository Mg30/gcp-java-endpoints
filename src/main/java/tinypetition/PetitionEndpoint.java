package tinypetition;
import java.util.ArrayList;
import tinypetition.Petition;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.config.ApiMethod;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.EntityNotFoundException;
import com.google.appengine.api.datastore.Key;
import com.google.api.server.spi.config.Named;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;


@Api(name = "petapi",
version = "v1",
namespace = @ApiNamespace(ownerDomain = "helloworld.example.com",
    ownerName = "helloworld.example.com",
    packagePath = ""))
public class PetitionEndpoint {
	
	@ApiMethod(name = "addPetition",
			httpMethod = ApiMethod.HttpMethod.POST)
	public Entity addPetition(Petition incomepetition) {
		Entity petition = new Entity("Petition",incomepetition.name);
		petition.setProperty("name", incomepetition.name);
		petition.setProperty("description", incomepetition.description);
		Entity petitionIndex = new Entity("PetitionIndex",petition.getKey());
		ArrayList<String> signataires = new ArrayList<String>();
		petitionIndex.setProperty("signataires", signataires);
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		datastore.put(petition);
		datastore.put(petitionIndex);
		return petition;
	}
	
	@ApiMethod(name ="getPetition",
			httpMethod = ApiMethod.HttpMethod.POST
			)
	public Entity getPetition(Key petitionKey) throws EntityNotFoundException {
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		Entity petition = datastore.get(petitionKey);
		return petition;
	}
}


