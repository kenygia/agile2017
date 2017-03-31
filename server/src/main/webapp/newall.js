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
