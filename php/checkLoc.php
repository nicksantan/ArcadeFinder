
<?php
$name = $_POST["name"];
$theLat = $_POST["lat"];
$theLon = $_POST["lon"];

$con = mysql_connect("localhost","zhukovvi_ACF","Dccomics$6");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db("zhukovvi_arcadefinder", $con);
// Get all the data from the "example" table
$result = mysql_query("SELECT * FROM locs WHERE name = '$name' AND lat = '$theLat'") 
or die(mysql_error());  
if(mysql_num_rows($result) == 0) { 
echo 0;
}
if(mysql_num_rows($result) > 0) { 
echo 1;
}


mysql_close($con);
?>