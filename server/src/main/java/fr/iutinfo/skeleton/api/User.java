package fr.iutinfo.skeleton.api;

import com.google.common.base.Charsets;
import com.google.common.hash.Hasher;
import com.google.common.hash.Hashing;
import fr.iutinfo.skeleton.common.dto.UserDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.security.Principal;
import java.security.SecureRandom;

public class User implements Principal {
	final static Logger logger = LoggerFactory.getLogger(User.class);
	private static User anonymous = new User(-1, "Anonymous", "anonym");
	private String name;
	private String alias;
	private int id = 0;
	private String email;
	private String phone;
	private String password;
	private String passwdHash;
	private String salt;
	private String search;

	public User(int id, String name) {
		this.id = id;
		this.name = name;
	}

	public User(int id, String name, String alias) {
		this.id = id;
		this.name = name;
		this.alias = alias;
	}

	public User() {
	}

	public static User getAnonymousUser() {
		return anonymous;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		passwdHash = buildHash(password, getSalt());
		this.password = password;
	}

	private String buildHash(String password, String s) {
		Hasher hasher = Hashing.sha256().newHasher();
		hasher.putString(password + s, Charsets.UTF_8);
		return hasher.hash().toString();
	}

	public boolean isGoodPassword(String password) {
		if (isAnonymous()) {
			return false;
		}
		String hash = buildHash(password, getSalt());
		return hash.equals(getPasswdHash());
	}

	public String getPasswdHash() {
		return passwdHash;
	}

	public void setPasswdHash(String passwdHash) {
		this.passwdHash = passwdHash;
	}

	@Override
	public boolean equals(Object arg) {
		if (getClass() != arg.getClass())
			return false;
		User user = (User) arg;
		return name.equals(user.name) && alias.equals(user.alias) && email.equals(user.email)
				&& passwdHash.equals(user.getPasswdHash()) && salt.equals((user.getSalt()));
	}

	@Override
	public String toString() {
		return id + ": " + alias + ", " + name + " <" + email + ">" + " <" + phone + ">";
	}

	public String getAlias() {
		return alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
	}

	public String getSalt() {
		if (salt == null) {
			salt = generateSalt();
		}
		return salt;
	}

	public void setSalt(String salt) {
		this.salt = salt;
	}

	private String generateSalt() {
		SecureRandom random = new SecureRandom();
		Hasher hasher = Hashing.sha256().newHasher();
		hasher.putLong(random.nextLong());
		return hasher.hash().toString();
	}

	public void resetPasswordHash() {
		if (password != null && !password.isEmpty()) {
			setPassword(getPassword());
		}
	}

	public boolean isInUserGroup() {
		return !(id == anonymous.getId());
	}

	public boolean isAnonymous() {
		return this.getId() == getAnonymousUser().getId();
	}

	public String getSearch() {
		search = name + " " + email;
		return search;
	}

	public void setSearch(String search) {
		this.search = search;
	}

	public void initFromDto(UserDto dto) {
		this.setAlias(dto.getAlias());
		this.setEmail(dto.getEmail());
		this.setPhone(dto.getPhone());
		this.setId(dto.getId());
		this.setName(dto.getName());
		this.setPassword(dto.getPassword());
	}

	public UserDto convertToDto() {
		UserDto dto = new UserDto();
		dto.setAlias(this.getAlias());
		dto.setEmail(this.getEmail());
		dto.setPhone(this.getPhone());
		dto.setId(this.getId());
		dto.setName(this.getName());
		dto.setPassword(this.getPassword());
		return dto;
	}

	public boolean isValid() {
		if (this.name.isEmpty() && this.email.isEmpty() && this.getPassword().isEmpty()
				&& this.email.matches("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$"))
			return false;
		else
			return true;
	}

	public boolean isInGroup(String s) {
		if ("user".equals(s))
			return true;
		else
			return false;
	}
}
