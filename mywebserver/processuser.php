<?php
 
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // collect value of input field
    $name = $_REQUEST['fname'];
	$pass = $_REQUEST['fpass'];
    if (empty($name)) {
        echo "Name is empty \n";
    } else {
        //echo "name =";
		//echo $name;
    }
	if (empty($pass)) {
        echo "pass is empty \n";
    } else {
        //echo "pass =";
		//echo $pass;
    }
}

// read from user list
$author = 0;
$doc = new DomDocument(); 
$doc->load('user.xml');
$dom = $doc->documentElement;
$id = $dom->getElementsByTagName('user');
// compare user value
foreach ($id as $node) {
	//print $node->childNodes->item(1)->textContent . "\n";
	//print $node->childNodes->item(3)->textContent . "\n";
	if ($node->childNodes->item(1)->textContent == $name) {
		if ($node->childNodes->item(3)->textContent == $pass) {
			//echo "authorized";
			$author = 1;
			break;
		}
	}
}

if ($author == 1){
	echo "authorized";
} else {
	echo "unauthorized";
}
 ?>