var errorField = "";

function startTimer(fName) {
 errorField = fName;
 window.setTimeout("clearError(errorField)", 5000);
};

function clearError(objName) {
 document.getElementById(objName).innerHTML = "";
};

function isEmpty(word){
	if(word.length==0){
		return true;
	}
	return false;
};

function validate(formParameter){
	var name;
	
	name=formParameter.elements["f_fname"];
	if(!checkStringAndFocus(name,"First name cannot be empty or contain white spaces!")){
		formParameter.elements["f_fname"].className = "wrong";
		return false;
	}
	
	name=formParameter.elements["f_lname"];
	if(!checkStringAndFocus(name,"Last name cannot be empty or contain white spaces!")){
		formParameter.elements["f_lname"].className = "wrong";
		return false;
	}
	
	name=formParameter.elements["f_zip"].value;
	if(!checkZIPCodeRegEx(name)){
		formParameter.elements["f_zip"].className = "wrong";
		return false;
	}
	
	name=formParameter.elements["f_street"];
	if(!checkStringAndFocus(name,"Street cannot be empty or contain white spaces!")){
		formParameter.elements["f_street"].className = "wrong";
		return false;
	}
	
	name=formParameter.elements["f_city"];
	if(!checkStringAndFocus(name,"City cannot be empty or contain white spaces!")){
		formParameter.elements["f_city"].className = "wrong";
		return false;
	}
	
	name=formParameter.elements["f_email"].value;
	if(!checkEmailRegEx(name)){
		formParameter.elements["f_email"].className = "wrong";
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

function checkEmailRegEx(str) {
	var email = /[a-zA-Z_0-9\.]+@[a-zA-Z_0-9\.]+\.[a-zA-Z][a-zA-Z]+/;
	if (email.test(str))
		return true;
	else {
		alert("Wrong e-mail address");
		return false;
	}
};

function checkStringAndFocus(obj, msg) {
	var str = obj.value;
	var errorFieldName = "e_" + obj.name.substr(2, obj.name.length);
	if (isWhiteSpace(str) || isEmpty(str)) {
		document.getElementById(errorFieldName).innerHTML = msg;
		obj.focus();
		startTimer(errorFieldName);
		return false;
	}
	else {
		return true;
	}
};

function showElement(e) {
 document.getElementById(e).style.visibility = 'visible';
};

function hideElement(e) {
 document.getElementById(e).style.visibility = 'hidden';
};

function checkZIPCodeRegEx(str) {
	var zipCode = /[0-9]{2}-[0-9]{3}/;
	if(zipCode.test(str)) {
		document.getElementById("zip").innerHTML = "OK";
        document.getElementById("zip").className = "green";
		return true;
	}
	else{
		document.getElementById("zip").innerHTML = "WRONG";
        document.getElementById("zip").className = "red";
		return false;
	}
};