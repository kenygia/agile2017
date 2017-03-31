package fr.iutinfo.skeleton.api;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.SecurityContext;

import fr.iutinfo.skeleton.common.dto.UserDto;

@Path("/login")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class LoginResource {
    @GET
    public User getWhoAmI(@Context SecurityContext context) {
        User u = (User) context.getUserPrincipal();
        if (u.isAnonymous()) {
            throw new WebApplicationException(401);
        }
        return u;
    }
    
    @POST
    public User postWhoAmI(@Context SecurityContext context, UserDto dto) {
        User u = (User) context.getUserPrincipal();
        if (u.isAnonymous()) {
            throw new WebApplicationException(401);
        }
            return u;
    }
}
