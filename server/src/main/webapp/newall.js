var user = "";
var user_token = "";

$(document).ready(function() {

	$("#get-ram").click(function () {getUser($('#user').val())});
	$("#post-ram").click(function () {postUser($('#user').val())});
	$("#list-ram").click(function () {listUsers()});
	$("#get-bdd").click(function () {getUserBdd($('#userdb').val())});
	$("#post-bdd1").click(function () {
		erreur = getError1($('#userdb').val(), $('#emaildb').val(), $('#passwddb').val());
		if(erreur !=''){
			$("#erreurdiv1").html(erreur);
		}
		else{
			postUserBdd(
					$('#userdb').val(),
					$('#aliasdb').val(),
					$('#emaildb').val(),
					$('#passwddb').val())
		}
	});

	$("#post-bdd2").click(function (){
		erreur2 = getError2($('#userlogin').val(), $('#passwdlogin').val());
		if(erreur2 !=''){
			$("#erreurdiv2").html(erreur2);
		}
		else{
			//CacheConnInscr();
			//getUserBdd($('#userlogin').val())
			getSecure($('#userlogin').val(), $('#passwdlogin').val(), "v1/login")
			//EnvoiPageUtilisateur()
			//getOffre(1)
			//getOffres()
		}
	});
	$("#list-bdd").click(function () {listUsersBdd()});
	$("#read-forall").click(function () {getForAll()});
	$("#read-byannotation").click(function () {getByAnnotation()});
});


function CacheConnInscr() {
	$(".col-md-6").hide();
}

function initAllOffre()
{
	var b = $(".jeveux").show();
	getOffres();
	return b;
}


function initMesOffre()
{
	var b = $(".jemeux").show();
	getMesOffres();
	return b;
}


function EnvoiPageUtilisateur(){

	CacheConnInscr();
	$(".ficheutilisateur").show();
	return initAllOffre();


}






function getError1(name,email,pwd){
	let erreur = '';
	if (name== "")
		erreur += "<p>vous devez ajouter un nom </p>" ;
	if (email== "" || !validateEmail(email))
		erreur += "<p>vous devez ajouter un email valide</p>" ;
	if (pwd== "")
		erreur += "<p>vous devez ajouter un un mot de passe </p>" ;
	return erreur ;
}

function getError2(name,pwd){
	let erreur = '';
	if (name== "")
		erreur += "<p>vous devez ajouter un nom </p>" ;
	if (pwd== "")
		erreur += "<p>vous devez ajouter un un mot de passe </p>" ;
	return erreur ;
}


function validateEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}



//--------------------------------------------getutilisateurs--------------------------

function getSecure(url) {
	if($("#userlogin").val() != "") {
		$.ajax
		({
			type: "GET",
			url: url,
			dataType: 'json',
			beforeSend : function(req) {
				req.setRequestHeader("Authorization", "Basic " + btoa($("#userlogin").val() + ":" + $("#passwdlogin").val()));
			},
			success: function (data) {
				afficheUser(data);
			},
			error : function(jqXHR, textStatus, errorThrown) {
				alert('error: ' + textStatus);
			}
		});
	} else {
		$.getJSON(url, function(data) {
			afficheUser(data);
		});
	}
}


function getSecure(user, password, url) {
	let token = make_base_auth(user, password);
	$.ajax
	({
		type: "GET",
		url: url,
		dataType: 'json',
		beforeSend : function(req) {
			req.setRequestHeader('Authorization', make_base_auth(user, password));
		},
		success: function (data) {
			$("#erreurdiv2").html('');
			CacheConnInscr();
			EnvoiPageUtilisateur();
			afficheUser(data);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			$("#erreurdiv2").html('<p>'+errorThrown+'<p>');
		}
	});
}


function make_base_auth(user, password) {
	var tok = user + ':' + password;
	var hash = btoa(tok);
	return "Basic " + hash;
}



function getUserBdd(name) {
	getUserGeneric(name, "v1/user/");
}

function getUserGeneric(name, url) {

//	$.ajax({
//	type: "GET",
//	url: url + name,
//	success:function(data){
//	if(data==1)
//	{
//	alert("le compte existe bien");
//	}
//	else
//	{
//	alert("le compte n'existe pas");
//	}
//	},
//	error : function(jqXHR, textStatus, errorThrown) {
//	alert('le nom de lerror: ' + textStatus);

//	}

//	});

	$.getJSON(url + name, function(data) {
		console.log(data);
		user = data;
		user_token = btoa($("#userlogin").val() + ":" + $("#passwdlogin").val());
		afficheUser(data);
	});
}



function afficheUser(data) {
	console.log(data);
	// $("#reponse").html(data.id + " : <b>" + data.alias + "</b> (" + data.name
	// + ")");
	// alert(data.id +""+ data.alias +""+ data.name+"");
	$(".label-primary").html("vous êtes connecté : " + data.alias);
}

//-------------------------------------------getliste-utilisateur---------------------------------


function listUsersBdd() {
	listUsersGeneric("v1/user/");
}

function listUsersGeneric(url) {
	$.getJSON(url, function(data) {
		afficheListUsers(data)
	});
}

function afficheListUsers(data) {
	var html = '<ul>';
	var index = 0;
	for (index = 0; index < data.length; ++index) {
		html = html + "<li>"+ data[index].name + "</li>";
	}
	html = html + "</ul>";
	$("#reponse").html(html);
}


//-------------------------------------------post-utilisateur---------------------------------
function postUserBdd(name, alias, email, pwd) {
	postUserGeneric(name, alias, email, pwd, "v1/user/");
	return EnvoiPageUtilisateur();

}


function postUserGeneric(name, alias, email, pwd, url) {
	console.log("postUserGeneric " + url)
	$.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : url,
		dataType : "json",
		data : JSON.stringify({
			"name" : name,
			"alias" : alias,
			"email" : email,
			"password" : pwd
		}),
		success : function(data, textStatus, jqXHR) {
			afficheUser(data);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			console.log('postUser error: ' + textStatus);
		}
	});
}
