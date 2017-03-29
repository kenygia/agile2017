package fr.iutinfo.skeleton.api;

import org.skife.jdbi.v2.sqlobject.*;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapperFactory;
import org.skife.jdbi.v2.tweak.BeanMapperFactory;

import java.util.List;

public interface OfferDAO {
	@SqlUpdate("create table offers (id integer primary key autoincrement, id_user integer, titre varchar(255), detail varchar(1000))")
	void createOfferTable();

	@SqlUpdate("insert into offers (id_user,titre, detail) values (:id_user, :titre, :detail)")
	@GetGeneratedKeys
	int insert(@BindBean() Offer offer);

	@SqlQuery("select * from offers where titre = :titre")
	@RegisterMapperFactory(BeanMapperFactory.class)
	Offer findByName(@Bind("titre") String titre);

	@SqlQuery("select * from offers where titre like :titre")
	@RegisterMapperFactory(BeanMapperFactory.class)
	List<Offer> search(@Bind("titre") String titre);

	@SqlUpdate("drop table if exists offers")
	void dropOfferTable();

	@SqlUpdate("delete from offers where id = :id")
	void delete(@Bind("id") int id);
	
	@SqlUpdate("delete from offers")
	void deleteAll();

	@SqlQuery("select * from offers order by id")
	@RegisterMapperFactory(BeanMapperFactory.class)
	List<Offer> all();

	@SqlQuery("select * from offers where id = :id")
	@RegisterMapperFactory(BeanMapperFactory.class)
	Offer findById(@Bind("id") int id);

	@SqlQuery("select * from offers where id_user = :id_user")
	@RegisterMapperFactory(BeanMapperFactory.class)
	List<Offer> allFromUser(@Bind("id_user") int id_user);

	void close();
}
