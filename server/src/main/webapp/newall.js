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


function EnvoiPageUtilisateur(){
	return $(".ficheutilisateur").show();

}

function envoiAnnonce()
{
	$(".formulaireproduit").show()
	$('#submitlier').on('submit', function (e)
	{
		// On empêche le navigateur de soumettre le formulaire
		e.preventDefault();

		var $form = $(this);

		$.ajax(
		{
			url: $form.attr('action'),
			type: $form.attr('method'),
	      	data: $form.serialize(),
	      	success: function (response)
	      	{
	                // La réponse du serveur
	    	}
	  	});
	});

}



function progress(e) {
	if (e.lengthComputable) {
		$('#progress_percent').text(Math.floor((e.loaded * 100) / e.total));
		$('progress').attr({value:e.loaded,max:e.total});
	}

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


//--------------------------------------------getoffres------------------------------

function getOffres()
{
	let select = $(".atoi-item");
	var url = "v1/offer/all";
	$.ajax
	({
		type: "GET",
		url: url,
		dataType: 'json',
		success: function (data) {
			getAllOffres(data, select);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert('error: ' + textStatus);
		}
	});
}


function getOffre(id)
{
	let id1 = id
	let select = $(".amoi-item");
	let url2 = "v1/offer/"+id1+"";
	$.ajax
	({
		type: "GET",
		url: url2,
		dataType: 'json',
		success: function (data) {
			getAllOffres(data, select);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert('error: ' + textStatus);
		}
	});
}

function getAllOffres(data, select){
	var i;
	for (i=0;i<data.length;i++) {
		addOffreVisual(data[i], select);

	}
}
function addOffreVisual(json, select)
{
	select.append('<div class="col le_titre" style="font-size: large">' + json.titre + '</div><div class="col le_debut_text">' + json.detail + '</div>');
}


function getForAll() {
	getSecure("v1/secure/who");
}

function getByAnnotation() {
	getSecure("v1/secure/byannotation");
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
//		type: "GET",
//		url: url + name,
//		success:function(data){
//			if(data==1)
//			{
//				alert("le compte existe bien");
//			}
//			else
//			{
//				alert("le compte n'existe pas");
//			}
//		},
//		error : function(jqXHR, textStatus, errorThrown) {
//			alert('le nom de lerror: ' + textStatus);
//
//		}
//
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
//--------------------------------------------postoffres------------------------------

document.querySelector("#submitlier").addEventListener("click", postAnnonce);

function postAnnonce(){
	//var file = $('#exampleInputFile').get(0).files[0];
	console.log("on publie");
	var formData = new FormData();
	//formData.append('file', file);
	var url = "/v1/offer"
	console.log("postAnnonce: " + url)
	$.ajax({
		type : 'POST',
		contentType : 'application/json',
		url : url,
		dataType : "json",
		beforeSend : function(req) {
			req.setRequestHeader("Authorization", "Basic " + user_token);
		},
		data : JSON.stringify({
			"titre" : document.querySelector(".formulaireproduit #titre").value,
			"detail" : document.querySelector(".formulaireproduit #detail").value,
			"user_id" : user.id
		}),
		success : function(data, textStatus, jqXHR) {
			console.log(data);
			getOffres();
		},
		error : function(jqXHR, textStatus, errorThrown, data) {
			console.log(data);
			console.log('postAnnonce : ' + textStatus + errorThrown + jqXHR);
		}
	});

	/*
	$.ajax({
		url: 'v1/offer/',
		type: 'POST',
		data: formData,
		cache: false,
		contentType: false,
		processData: false,
		success: function(){
			console.log('file upload complete');
		},
		error: function(response){
			var error = "error";
			if (response.status != 200){
				error = response.responseText;
			}
			console.log(error);
		},
		xhr: function() {
			var myXhr = $.ajaxSettings.xhr();
			if (myXhr.upload) {
				myXhr.upload.addEventListener('progress', progress, false);
			} else {
				console.log('Upload progress is not supported.');
			}
			return myXhr;
		}
	});*/
}
