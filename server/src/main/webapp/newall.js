$(document).ready(function() {
	
	$("#get-ram").click(function () {getUser($('#user').val())});
	$("#post-ram").click(function () {postUser($('#user').val())});
	$("#list-ram").click(function () {listUsers()});
	$("#get-bdd").click(function () {getUserBdd($('#userdb').val())});
	$("#post-bdd1").click(function () {postUserBdd(
			$('#userdb').val(),
			$('#aliasdb').val(),
			$('#emaildb').val(),
			$('#phonedb').val(),
			$('#passwddb').val())
			CacheConnInscr()
			EnvoiPageUtilisateur()});
	$("#post-bdd2").click(function (){
		
		CacheConnInscr()
		getUserBdd($('#userlogin').val())
		EnvoiPageUtilisateur()
		envoiAnnonce()
		getOffre(1)
		getOffres()
	});
	$("#list-bdd").click(function () {listUsersBdd()});
	$("#read-forall").click(function () {getForAll()});
	$("#read-byannotation").click(function () {getByAnnotation()});
});


function CacheConnInscr() {
	$(".col-md-6").hide();
}


function EnvoiPageUtilisateur(){
	$(".ficheutilisateur").show()

}

function envoiAnnonce()
{
	$(".formulaireproduit").show()
}

$(function(){
	$('#submitlier').click(upload);
});

function progress(e) {
	if (e.lengthComputable) {
		$('#progress_percent').text(Math.floor((e.loaded * 100) / e.total));
		$('progress').attr({value:e.loaded,max:e.total});
	}

}

function alertChampVide(){
	alert("champ vide");
}


//--------------------------------------------getoffres------------------------------

function getOffres()
{
	let select = $(".atoi-item");
	var url = "v1/offer";
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
		console.log("dans for" + data[i].titre);
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

function getUserBdd(name) {
	 	getUserGeneric(name, "v1/user/");
	 }

function getUserGeneric(name, url) {
	$.getJSON(url + name, function(data) {
		afficheUser(data);
	});
}



function afficheUser(data) {
	console.log(data);
	//$("#reponse").html(data.id + " : <b>" + data.alias + "</b> (" + data.name + ")");
	//alert(data.id +""+ data.alias +""+ data.name+"");
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
	alert("name : "+name+"email : "+ email)
	if (name != "" && pwd != "" && email !="")
	{
	     return postUserGeneric(name, alias, email, pwd, "v1/user/");
	}
	else if (name == "")
	{
	     alert('Remplissez le champs nom');
	     return false;
	}
	else if (pwd == "")
	{
	     alert('Remplissez le champs prénom');
	     return false;
	}
	else (email == "")
	{
	     alert('Remplissez le champs prénom');
	     return false;
	}
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
			"password" : pwd,
			"id" : 0
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


function postAnnonce(){
	var file = $('#exampleInputFile').get(0).files[0];

	var formData = new FormData();
	formData.append('file', file);

	$.ajax({
		url: 'v1/user/',
		type: 'POST',
		data: formData,
		cache: false,
		contentType: false,
		processData: false,
		success: function(){
			alert('file upload complete');
		},
		error: function(response){
			var error = "error";
			if (response.status === 409){
				error = response.responseText;
			}
			alert(error);
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
	});
}

