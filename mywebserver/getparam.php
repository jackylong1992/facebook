<?php
 
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // collect value of input field
    $name = $_REQUEST['fname'];
	$pass = $_REQUEST['fpass'];
    if (empty($name)) {
        echo "Name is empty";
    } else {
        echo $name;
    }
	if (empty($pass)) {
        echo "pass is empty";
    } else {
        echo $pass;
    }
}

 ?>