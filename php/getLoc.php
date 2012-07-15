
<?php

$con = mysql_connect("localhost","zhukovvi_ACF","Dccomics$6");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db("zhukovvi_arcadefinder", $con);
// Get all the data from the "example" table
$result = mysql_query("SELECT * FROM locs") 
or die(mysql_error());  
//mysql_query("INSERT INTO locs (name, games, lat, lon, address)
//VALUES ('$name', '$games', '$theLat', '$theLon', '$address')");
$sql = mysql_query("SELECT * FROM locs");
$results = array();
while($row = mysql_fetch_array($sql))
{
   $results[] = array(
      'name' => $row['name'],
      'games' => $row['games'],
      'addy' => $row['address'],
      'lat' => $row['lat'],
      'lon' => $row['lon'],
   );
}
$json = json_encode($results);
echo $json;


//json_encode(array("name"=>"John","games"=>"2pm","address"=>"2pm","lat"=>"2pm","lon"=>"2pm"));

//while($row = mysql_fetch_array($result)){
//	echo $row['name'];
//}
mysql_close($con);
?>