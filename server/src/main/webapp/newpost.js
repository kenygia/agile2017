
function postUserBdd(name, alias, email, pwd) {
	if (name != NULL && pwd != NULL && email !=NULL)
	{
	     return postUserGeneric(name, alias, email, pwd, "v1/user/");
	}
	else if (name == NULL)
	{
	     alert('Remplissez le champs nom');
	     return false;
	}
	else if (pwd == NULL)
	{
	     alert('Remplissez le champs prénom');
	     return false;
	}
	else (email == NULL)
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
