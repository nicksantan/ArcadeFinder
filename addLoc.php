
<?php
$test = "bobby";
$name = $_POST["name"];
$games = $_POST["games"];
$theLat = $_POST["lat"];
$theLon = $_POST["lon"];
$address = $_POST["address"];
$con = mysql_connect("localhost","zhukovvi_ACF","Dccomics$6");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db("zhukovvi_arcadefinder", $con);

mysql_query("INSERT INTO locs (name, games, lat, lon, address)
VALUES ('$name', '$games', '$theLat', '$theLon', '$address')");

mysql_close($con);
?>

