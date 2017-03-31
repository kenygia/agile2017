package fr.iutinfo.skeleton.api;

import com.google.common.base.Charsets;
import com.google.common.hash.Hasher;
import com.google.common.hash.Hashing;

import fr.iutinfo.skeleton.common.dto.OfferDto;
import fr.iutinfo.skeleton.common.dto.UserDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.security.Principal;
import java.security.SecureRandom;

public class Offer {
	final static Logger logger = LoggerFactory.getLogger(Offer.class);
	private int id;
	private int id_user;
	private String titre;
	private String detail;
	private boolean active;

	public Offer() {
	}

	public Offer(int id, int id_user, String titre, String detail) {
		this.id = id;
		this.id_user = id_user;
		this.titre = titre;
		this.detail = detail;
		this.setActive(true);
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getId_user() {
		return id_user;
	}

	public void setId_user(int id_user) {
		this.id_user = id_user;
	}

	public String getTitre() {
		return titre;
	}

	public void setTitre(String titre) {
		this.titre = titre;
	}

	public String getDetail() {
		return detail;
	}

	public void setDetail(String detail) {
		this.detail = detail;
	}

	public boolean getActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	@Override
	public boolean equals(Object arg) {
		if (getClass() != arg.getClass())
			return false;
		Offer offre = (Offer) arg;
		return this.id == offre.id && this.id_user == offre.id_user && this.titre.equals(offre.titre)
				&& this.detail.equals(offre.detail);
	}

	@Override
	public String toString() {
		return id + ", " + id_user + ", " + titre + ", " + detail;
	}

	public void initFromDto(OfferDto dto) {
		this.setId(dto.getId());
		this.setId_user(dto.getId_user());
		this.setTitre(dto.getTitre());
		this.setDetail(dto.getDetail());
		this.setActive(dto.getActive());
	}

	public OfferDto convertToDto() {
		OfferDto dto = new OfferDto();
		dto.setId(this.id);
		dto.setId_user(this.id_user);
		dto.setTitre(this.titre);
		dto.setDetail(this.detail);
		dto.setActive(this.getActive());
		return dto;
	}
}
