package fr.iutinfo.skeleton.api;

import static fr.iutinfo.skeleton.api.BDDFactory.getDbi;
import static fr.iutinfo.skeleton.api.BDDFactory.tableExist;

import java.sql.SQLException;
import java.util.List;
import java.util.stream.Collectors;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import fr.iutinfo.skeleton.common.dto.OfferDto;
import fr.iutinfo.skeleton.common.dto.UserDto;

@Path("/offer")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class OfferResource {
	final static Logger logger = LoggerFactory.getLogger(OfferResource.class);
	private static OfferDAO dao = getDbi().open(OfferDAO.class);

	public OfferResource() throws SQLException {
		if (!tableExist("offers")) {
			logger.debug("Crate table offers");

			dao.createOfferTable();
			dao.insert(new Offer(0, 1, "Mon Vélo", "J'échange mon beau vélo"));
		}
		dao.deleteAll();
		dao.insert(new Offer(0, 1, "Mon Vélo", "J'échange mon beau vélo"));
		dao.insert(new Offer(0, 1, "Lave-linge", "Presque neuve..."));
	}

	@POST
	public OfferDto createOffer(OfferDto dto) {
		Offer offer = new Offer();
		offer.initFromDto(dto);
		int id = dao.insert(offer);
		dto.setId(id);
		return dto;
	}

	@GET
	@Path("/{id}")
	public OfferDto getOffer(@PathParam("id") int id) {
		Offer offer = dao.findById(id);
		if (offer == null) {
			throw new WebApplicationException(404);
		}
		return offer.convertToDto();
	}

	@GET
	public List<OfferDto> getAllOffers(@QueryParam("id_user") String id_user) {
		List<Offer> offers;
		if (id_user == null) {
			logger.debug("get all offers");
			offers = dao.all();
		} else {
			logger.debug("Search offers with query: " + id_user);
			
			offers = dao.allFromUser(Integer.parseInt(id_user));
		}
		return offers.stream().map(Offer::convertToDto).collect(Collectors.toList());
	}

	@DELETE
	@Path("/{id}")
	public void deleteOffer(@PathParam("id") int id) {
		dao.delete(id);
	}

}