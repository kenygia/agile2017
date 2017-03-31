package fr.iutinfo.skeleton.api;

import static fr.iutinfo.skeleton.api.BDDFactory.getDbi;
import static fr.iutinfo.skeleton.api.BDDFactory.tableExist;

import java.sql.SQLException;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.SecurityContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import fr.iutinfo.skeleton.common.dto.OfferDto;
import fr.iutinfo.skeleton.common.dto.UserDto;
// TODO : active  

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
			dao.insert(new Offer(0, 0, "Mon Vélo", "J'échange mon beau vélo"));
			dao.insert(new Offer(0, 0, "Lave-linge", "Presque neuve..."));
		}
		dao.insert(new Offer(0,3,"The company","we sold it to and that way it comes under the monthly current budget and not the capital account"));
		dao.insert(new Offer(0,4,"Machine that goes ping","This is my favorite"));
		dao.insert(new Offer(0,5,"Centuwion","Stwike him vewy wuffly!"));
		dao.insert(new Offer(0,6,"Strange women","Lyin' in ponds distributin' swords is no basis for a system of government"));
		dao.insert(new Offer(0,7,"People's Front of Judea","hereby convey our sincere fraternal and sisterly greetings to you, Brian, on this, the occasion of your martyrdom"));
		dao.insert(new Offer(0,8,"Martin Luther","his protest up to the church door in fifteen-seventeen"));
		dao.insert(new Offer(0,9,"Joke warfare","banned at a special session of the Geneva Convention"));
		dao.insert(new Offer(0,10,"Pero las llamas son peligrosas","Si usted ve una llama donde hay gente﻿ nadando, usted gritar: ¡Cuidado! ¡Llamas!"));
		dao.insert(new Offer(0,3,"A roman mum","I'm a kike, a yid, a heebie, a hook-nose, I'm kosher mum, I'm a Red Sea pedestrian, and proud of it!"));
		dao.insert(new Offer(0,4,"The capital of Assyria","There's no Messiah in here. There's a mess all right, but no Messiah."));
		dao.insert(new Offer(0,5,"Dibley Road","At this time, a friend shall lose his friend's hammer and the young shall not know where lieth the things possessed by their fathers that their fathers put there only just the night before, about eight o'clock"));
		
	}

	@POST
    @RolesAllowed({"user"})
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
	@Path("/user")
	public List<OfferDto> getUserAllOffers(@Context SecurityContext context) {
		List<Offer> offers;
        User u = (User) context.getUserPrincipal();
		if (u.isAnonymous()) {
			logger.debug("get all user offers");
			offers = dao.all();
		} else {
			logger.debug("Search offers with query: " + u.getId());
			
			offers = dao.allFromUser(u.getId());
		}
		return offers.stream().map(Offer::convertToDto).collect(Collectors.toList());
	}
	
	@GET
	@Path("/all")
	public List<OfferDto> getAllOffers(@QueryParam("id_user") String id_user) {
		List<Offer> offers;
		logger.debug("get all offers");
		offers = dao.all();
		return offers.stream().map(Offer::convertToDto).collect(Collectors.toList());
	}
	
	@GET
	@Path("/active")
	public List<OfferDto> getActiveOffers() {
		List<Offer> offers;
		logger.debug("get all active offers");
		offers = dao.active();
		return offers.stream().map(Offer::convertToDto).collect(Collectors.toList());
	}

	@DELETE
	@Path("/{id}")
	public void deleteOffer(@PathParam("id") int id) {
		dao.delete(id);
	}

}
