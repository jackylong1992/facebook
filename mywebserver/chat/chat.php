<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // collect value of input field
    $user = $_REQUEST['fuser'];
	$cmd = $_REQUEST['fcmd'];
	$msg = $_REQUEST['fmsg'];
    if (empty($user)) {
        echo "user is empty \n";
    } else {
        //echo "name =";
		//echo $name;
    }
	
	if (empty($cmd)) {
        echo "cmd is empty \n";
    } else {
        //echo "name =";
		//echo $name;
    }
}

	//$user = "long";
	//$cmd = "sendmsg";




if ($cmd == "sendfile") {
	sendfile($user);
}

if ($cmd == "sendmsg") {
	sendmsg($user, $msg);
}

if ($cmd == "deletemsg") {
	deletemsg($user);
}

if ($cmd == "appendmsg") {
	appendmsg($user);
}


function sendfile($user) {
	// do this first
	// no need to implement by php script, just request directly to file
}
// function sending message add new message to mesage file
// when receive message, we copy the whole temp file to client, and append tempfile to main fike, and delete tempfile
function sendmsg($user, $msg) {
	$doc = new DomDocument(); 
	if ($user === "long") {
		$doc->load('linh/temp.xml');
		} else {
		$doc->load('long/temp.xml');
	}

	$dom = $doc->documentElement;

	$id = $dom->getElementsByTagName('mess');
	if ($id->length != 0) {
		$add = $id->item(0)->cloneNode (true);
		//$add->nodeValue = "new node";
		$add->nodeValue = $msg;
		
		$dom->insertBefore($add, $dom->lastChild);
	} else {
		$element = $doc->createElement('mess', '');
		$element->nodeValue = $msg;
		$dom->appendChild($element);
	}
	
	//print $doc->saveXML();
	$doc->preserveWhiteSpace = true;
	$doc->formatOutput = true;
	//$doc->save('linh/temp.xml'); // save as file 
	if ($user === "long") {
		$doc->save('linh/temp.xml');
		} else {
		$doc->save('long/temp.xml');
	}
	/*
	foreach ($id as $node) {
		//print $node->getNodePath() . "\n";
		//print $node->textContent . "\n";
		//print $node->childNodes->item(3)->textContent . "\n";
	}
	*/
	$domchild = $dom->childNodes;
	foreach ($domchild as $node) {
		//print $node->getNodePath() . "\n";
		//print $node->textContent . "\n";
		//print $node->childNodes->item(3)->textContent . "\n";
	}
	
}
// delete main
function deletemsg($user) {
	$doc = new DomDocument();
		if ($user === "long") {
			$doc->save('long/temp.xml'); // save as file 
		} else {
			$doc->save('linh/temp.xml'); // save as file 
	}
}
// copy temp to main xml, then delete main
function appendmsg($user) {
	$tempdoc = new DomDocument();
	$maindoc = new DomDocument(); 	
	if ($user === "long") {
		$tempdoc->load('long/temp.xml');
		$maindoc->load('long/main.xml');
		echo "long";
		print $maindoc->saveXML();
		print $tempdoc->saveXML();
		
		} else {
		$tempdoc->load('linh/temp.xml');
		$maindoc->load('linh/main.xml');
		echo "linh";
	}
	echo "break";
	// read tempdoc
	$tempdom = $tempdoc->documentElement;
	$tempid = $tempdom->getElementsByTagName('mess');
	
	// read maindoc
	$maindom = $maindoc->documentElement;
	
	// add each tempdoc node to maindoc
	foreach ($tempid as $node) {
		$temp = $maindoc->importNode ($node, true);
		$maindom->insertBefore($temp, $maindom->lastChild);
		$tempdom->removeChild($node);
	}
	$maindoc->preserveWhiteSpace = false;
	$maindoc->formatOutput = true;
	
	$tempdoc->preserveWhiteSpace = false;
	$tempdoc->formatOutput = true;
	//print $maindoc->saveXML();
	//print $tempdoc->saveXML();
	if ($user === "long") {
		$maindoc->save('long/main.xml');
		$tempdoc->save('long/temp.xml');
	} else {
		$maindoc->save('linh/main.xml');
		$tempdoc->save('linh/temp.xml');
	}
}

