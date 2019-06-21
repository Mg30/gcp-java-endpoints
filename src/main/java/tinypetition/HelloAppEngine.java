package tinypetition;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Random;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;

@WebServlet(
    name = "HelloAppEngine",
    urlPatterns = {"/populate"}
)
public class HelloAppEngine extends HttpServlet {
	public Random rand;

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response)
      throws IOException {
	  DatastoreService datastore =DatastoreServiceFactory.getDatastoreService();
	  this.rand = new Random();

	  for (int i = 0; i < 110; i++) {
		  Entity petition = new Entity("Petition","titre"+i);
		  petition.setProperty("name", "titre"+i);
		  petition.setProperty("owner","user"+i);
		  petition.setProperty("description", "description"+i);
		  int randomNum = this.rand.nextInt((1001 - 1) + 1) + 1;
		  petition.setProperty("total",randomNum);
		  petition.setProperty("currentIndex", 1);
		  Entity petitionIndex = new Entity("PetitionIndex","index"+1,petition.getKey());
		  ArrayList<String> signataires = new ArrayList<String>();
		  for (int j = 0; j < randomNum; j++) {
			  signataires.add("user"+j);
		}
		  petitionIndex.setProperty("nb",randomNum);
		  petitionIndex.setProperty("signataires", signataires);
		  datastore.put(petition);
		  datastore.put(petitionIndex);
	}
	  
  }
}