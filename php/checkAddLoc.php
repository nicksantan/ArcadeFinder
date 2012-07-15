
<?php
$test = "bobby";
$name = $_POST["name"];
$games = $_POST["games"];
$theLat = $_POST["lat"];
$theLon = $_POST["lon"];
$address = $_POST["address"];
$sn = $_POST["screenname"];
$con = mysql_connect("localhost","zhukovvi_ACF","Dccomics$6");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db("zhukovvi_arcadefinder", $con);
$result = mysql_query("SELECT * FROM locs WHERE name = '$name' AND lat = '$theLat'") 
or die(mysql_error());  
if(mysql_num_rows($result) == 0) { 
mysql_query("INSERT INTO locs (name, games, lat, lon, address, sn)
VALUES ('$name', '$games', '$theLat', '$theLon', '$address', '$sn')");
}
if(mysql_num_rows($result) > 0) { 
echo 1;
}


mysql_close($con);
?>

