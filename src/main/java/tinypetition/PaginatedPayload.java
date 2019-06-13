package tinypetition;
import java.util.List;

import com.google.appengine.api.datastore.Entity;

public class PaginatedPayload {
	public List<Entity> petitions;
	public String lastKey;

}
