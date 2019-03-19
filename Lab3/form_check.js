function isEmpty(word){
	if(word.length==0){
		return true;
	}
	return false;
}

function validate(formParameter){
	var name=formParameter.elements["f_fname"].value;
	if(checkString(name,"First name cannot be empty or contain white spaces!")==false){
		alert(msg);
		return false;
	}
	
	var name=formParameter.elements["f_lname"].value;
	if(checkString(name,"Last name cannot be empty or contain white spaces!")==false){
		alert(msg);
		return false;
	}
	
	var name=formParameter.elements["f_zip"].value;
	if(checkString(name,"Zip code cannot be empty or contain white spaces!")==false){
		alert(msg);
		return false;
	}
	
	var name=formParameter.elements["f_street"].value;
	if(checkString(name,"Street cannot be empty or contain white spaces!")==false){
		alert(msg);
		return false;
	}
	
	var name=formParameter.elements["f_city"].value;
	if(checkString(name,"City cannot be empty or contain white spaces!")==false){
		alert(msg);
		return false;
	}
	
	return true;
};

function isWhiteSpace(str) {
	var ws = "\t\n\r ";
	for (var i = 0; i < str.length; i++) {
		var c = str.charAt(i);
		if (ws.indexOf(c) == -1) {
			return false;
		}
	}
	return true;
};

function checkString(name, msg) {
	if(isEmpty(name)==true){
		alert(msg);
		return false;
	}
	if(isWhiteSpace(name)==true){
		alert(msg);
		return false;
	}
	return true;
};

function checkEmail(str) {
	if (isWhiteSpace(str)) {
		alert("Incorrect e-mail");
		return false;
	}
	else {
		var at = str.indexOf("@");
		if (at < 1) {
			alert("Incorrect e-mail");
			return false;
		}
		else {
			var l = -1;
			for (var i = 0; i < str.length; i++) {
				var c = str.charAt(i);
				if (c == ".") {
					l = i;
				}
			}
			if ((l < (at + 2)) || (l == str.length - 1)) {
				alert("Incorrect e-mail");
				return false;
			}
		}
		return true;
	}
};