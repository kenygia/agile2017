package fr.iutinfo.skeleton.api;

import java.util.List;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class OfferDaoTest {

	private OfferDAO dao;

	@Before
	public void initDb() {
		dao = BDDFactory.getDbi().open(OfferDAO.class);
		dao.dropOfferTable();
		dao.createOfferTable();
	}

	@Test
	public void shouldReturnEmptyListWhenTableIsCreated() {
		List<Offer> list = dao.all();
		Assert.assertEquals(0, list.size());
	}

	@Test
	public void shouldReturnOneWhenInsert() {
		int i = dao.insert(new Offer(0, 1, "Mon titre", "Mes détails"));
		Assert.assertTrue(i > 0);
	}

	@Test
	public void shouldReturnFiveWhenGetAll() {
		dao.insert(new Offer(0, 1, "Mon titre 2 ", "Mes détailsdétailsdétails"));
		dao.insert(new Offer(0, 1, "Mon titre 2 ", "Mes détailsdétailsdétails"));
		dao.insert(new Offer(0, 1, "Mon titre 2 ", "Mes détailsdétailsdétails"));
		dao.insert(new Offer(0, 1, "Mon titre 2 ", "Mes détailsdétailsdétails"));
		List<Offer> list = dao.all();
		Assert.assertEquals(4, list.size());
	}

}
