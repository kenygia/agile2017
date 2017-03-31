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

