var chatlistID = 0;
function main(){
	console.log("on load");
}

function comment(){
	var elem = event.srcElement;
	elem.value = "";
}

function uniKeyCode(event) {
    var key = event.which || event.keyCode; 
	var elem = event.srcElement;
	var farelem = elem.parentElement;
	if (key == 13) {
    	// Enter button here!!!		
		var para = document.createElement("p");
		var child_element = elem;
		var node = document.createTextNode(child_element.value);
		para.appendChild(node);
		para.style.marginLeft="50px";
		para.style.marginRight="50px";
		para.style.borderTop="1px solid pink";

		var element = farelem;		
		element.insertBefore(para,child_element);	
		
		var likebutton = document.createElement("p");
		var node = document.createTextNode("Like");
		likebutton.appendChild(node);
		likebutton.style.display="block";
		likebutton.style.marginLeft="50px";
		likebutton.style.color="pink";	
		likebutton.onclick= function () {
			likecommentclick(likebutton);
		}
	
		
		var likeicon = document.getElementById("likeicon").cloneNode(true);
		likeicon.style.display="inline-block";
		likeicon.style.position="relative";
		likeicon.getElementsByClassName("likebutton")[0].innerHTML = "0";

		likebutton.appendChild(likeicon);

		likebutton.onmouseover= function(){
			mousehandler(likebutton, "over");
		}
		
		likebutton.onmouseout= function(){
			mousehandler(likebutton, "out");
		}
		element.insertBefore(likebutton,child_element);	
		
		child_element.value = "";		
	}
}

function likecommentclick(likebutton) {
	likebutton.getElementsByClassName("likebutton")[0].innerHTML ++;
}

function mousehandler(param, status) {
	param.style.textDecoration="underline";
	if (status == "over") {
		param.style.fontWeight="bold";
		param.style.textDecoration="underline";
	} else {
		param.style.fontWeight="normal";
		param.style.textDecoration="none";
	}
	
}

function uniKeyCodechat(event) {
    var key = event.which || event.keyCode; 
	var elem = event.srcElement;
	var farelem = elem.parentElement;
	if (key == 13) {
    	// Enter button here!!!		
		var para = document.createElement("p");
		var child_element = elem;
		var node = document.createTextNode(child_element.value);
		para.appendChild(node);

		var element = farelem;		
		//element.insertBefore(para,child_element);		
		element.insertBefore(para,element.lastChild);	
		sendmessage(child_element.value);
		child_element.value="";
		
		
		

	}

}

function sendmessage(msg) {
	//var name = "long";
	var name = document.cookie;
	var cmd = "sendmsg";
	//console.log(document.cookie);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			// document.getElementById("txtHint").innerHTML = this.responseText; process receive info here
		}
	};
	var url="/chat/chat.php"+"?fuser="+name+"&fcmd="+cmd+"&fmsg="+msg;
	xmlhttp.open("POST", url, true);
	xmlhttp.send();
}

function poststatus(event) {
	console.log("post status");
	var insert_elem = document.createElement("article");
	var insert_elem_p = document.createElement("p");
	var node = document.createTextNode( document.getElementById("statusbox").value);
	insert_elem_p.appendChild(node);
	insert_elem_p.style.color="blue";
	var picture = document.getElementById("samplepicture").cloneNode(true);
	picture.style.visibility = "hidden";
	picture.style.width = "0px";
	picture.style.height = "0px";
	var inputbox = document.getElementById("in1").cloneNode(true);
	var likebar = document.getElementById("likebar").cloneNode(true);
	var likeicon = document.getElementById("likeicon").cloneNode(true);
	likeicon.children[1].innerHTML = "0";
	
	insert_elem.appendChild(insert_elem_p);
	insert_elem.appendChild(picture);
	insert_elem.appendChild(likebar);
	insert_elem.appendChild(likeicon);
	insert_elem.appendChild(inputbox);

	var x = document.getElementsByTagName("BODY")[0];
	//var first_article = document.getElementById("ar1"); This command is replaced by better command
	var first_article = document.getElementsByTagName("article")[1]; /*node[0] is the insert status node, so we have to insert it before node[1]*/
	x.insertBefore(insert_elem,first_article);
	
	
	
}

function friendclick(event) {
	var c = document.getElementById("third").children[chatlistID];
	console.log(chatlistID);
	chatlistID++;
	if (chatlistID > 1)
		chatlistID = 1;

	c.style.visibility = "visible";
	
	// query server to claw new xml file here
	console.log("html request");
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			httphandler(this, c);
		}
	};
	//xhttp.open("GET", "/chat/long/linh.xml", true);
	xhttp.open("GET", "/chat/" + document.cookie+ "/main.xml", true);
	xhttp.send();
	
	// query for new message on every second
	//setInterval(querymsg, 1000);
	setInterval(function(){ 
		querymsg(c); 
	}, 1000);

	


	
}

function querymsg (c) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			httphandler(this, c);
		}
	};
	//xhttp.open("GET", "/chat/long/temp.xml", true);
	xhttp.open("GET", "/chat/" + document.cookie +"/temp.xml", true);
	xhttp.send();
}

function deletenewmessage () {
	//var name = "long";
	var name = document.cookie;
	var cmd = "appendmsg";
	console.log("delete message");
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			// document.getElementById("txtHint").innerHTML = this.responseText; process receive info here
		}
	};
	var url="/chat/chat.php"+"?fuser="+name+"&fcmd="+cmd;
	xmlhttp.open("POST", url, true);
	xmlhttp.send();
}
// display xml content into box using Js
function httphandler(xml, currentchatbox) {
  var i;
  var xmlDoc = xml.responseXML;
  var x = xmlDoc.getElementsByTagName("mess");
  console.log(x.length);
  if (x.length == 0) {
	  return;
  }
  var message = "";
  for (i = 0; i <x.length; i++) { 
	//console.log("receive data");
	console.log(x[i].childNodes[0].nodeValue);
	message += x[i].childNodes[0].nodeValue + "\n";
  }
  
	var para = document.createElement("p");
	var node = document.createTextNode(message);
	para.appendChild(node);
	
	currentchatbox.insertBefore(para, currentchatbox.lastChild );
	deletenewmessage();

}

function hidechatbox(event){
	console.log("click");
	var elem = event.srcElement;
	var farelem = elem.parentElement;
	farelem.style.visibility = "hidden";
	chatlistID --;
	if (chatlistID < 0)
		chatlistID = 0;
	console.log(chatlistID);
}

function like(event) {
	var elem = event.srcElement;
	var grandfarelem = elem.parentElement.parentElement;
	var c = grandfarelem.children.length;

	grandfarelem.getElementsByTagName("p")[4].innerHTML ++;
}
