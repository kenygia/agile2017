
//--------------------------------------------offres------------------------------

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
	alert("avant for" + data.length);
	var i;
	for (i=0;i<data.length;i++) {
		console.log("dans for" + data[i].titre);
		alert("dans for" + data[i].titre);
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


//--------------------------------------------utilisateurs--------------------------

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

//-------------------------------------------liste-utilisateur---------------------------------


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
