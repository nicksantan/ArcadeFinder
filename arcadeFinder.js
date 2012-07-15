var map;
var locs;
var sw;
var sn;
var infowindow = new google.maps.InfoWindow({
    "maxWidth": 250,
    "content": "Loading..."
});


function checkForScreenName(){

    // Check if the user has been here before   
    sn = localStorage.getItem('screenname');
    
    if (sn == null){
        // in the future, check for platform here
        var new_sn = prompt("Welcome to ArcadeFinder! Register a username so you can receive points for the arcades you tag!");
        localStorage.setItem('screenname', new_sn);
        sn = new_sn;
    }

}

// declare style variables (turn lots of labels off)

var styleArray = [
  {
    featureType: "poi.business",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  },
  {
    featureType: "poi.attraction",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  },
  {
    featureType: "poi.government",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  },
  {
    featureType: "poi.medical",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  },
  {
    featureType: "poi.place_of_worship",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  },
  {
    featureType: "poi.school",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  },
  {
    featureType: "poi.sports_complex",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  }
];

function reformatGameName(input){
   var finalName
   switch(input){

        case "mspacman":
            finalName = "Ms. Pac Man"
        break;
        case "pacman":
            finalName = "Pac Man"
        break;
        case "galagamspacman":
            finalName = "Ms. Pac Man, Galaga"
        break;
        case "mspacmangalaga":
            finalName = "Ms. Pac Man, Galaga"
        break;
        case "galaga":
            finalName = "Galaga";
        break;
        case "bigbuckhunter":
            finalName = "Big Buck Hunter"
        break;
        case "buckhunter":
            finalName = "Big Buck Hunter"
        break;
        case "buckhunterpro":
            var finalName = "Big Buck Hunter Pro"
        break;
        case "bigbuckhunterpro":
            finalName = "Big Buck Hunter Pro"
        break;
        case "buckhuntersafari":
            finalName = "Big Buck Hunter Safari"
        break;
        case "bigbuckhuntersafari":
            finalName = "Big Buck Hunter Safari"
        break;
        case "bigbuckhunterworld":
            finalName = "Big Buck Hunter World"
        break;
        case "bigbuckhunterworld":
            finalName = "Big Buck Hunter World"
        break;
        default:
            finalName = input
    }
    
    return finalName;
}

function whichGameMarker(input){
    var whichIcon;
    switch(input){
                case "mspacman":
                whichIcon = "mspacman_marker.png"
                break;
                case "pacman":
                whichIcon = "pacman_marker.png"
                break;
                case "galaga":
                whichIcon = "galaga_marker.png"
                break;
                case "galagamspacman":
                whichIcon = "mspacmangalaga_marker.png"
                break;
                case "mspacmangalaga":
                whichIcon = "mspacmangalaga_marker.png"
                break;
                case "galaga":
                whichIcon = "galaga_marker.png"
                break;
                case "bigbuckhunter":
                whichIcon = "buckhunter_marker.png"
                break;
                case "buckhunter":
                whichIcon = "buckhunter_marker.png"
                break;
                case "buckhunterpro":
                whichIcon = "buckhunter_marker.png"
                break;
                case "bigbuckhunterpro":
                whichIcon = "buckhunter_marker.png"
                break;
                case "buckhuntersafari":
                whichIcon = "buckhunter_marker.png"
                break;
                case "bigbuckhuntersafari":
                whichIcon = "buckhunter_marker.png"
                break;
                case "bigbuckhunterworld":
                whichIcon = "buckhunter_marker.png"
                break;
                case "buckhunterworld":
                whichIcon = "buckhunter_marker.png"
                break;
                default:
                whichIcon = "arcade_marker.png"
    }
    
    return "markers/" + whichIcon;
}
function addSingleMarker(theLat,theLon,info_html,icon_info){
// Create an obj to hold the marker (see http://code.google.com/apis/maps/documentation/javascript/reference.html#MarkerOptions)
                var new_marker_opts = {
                    "position": new google.maps.LatLng( theLat, theLon),
                    "title": name,
                    "map": map,
                    "icon": {"url": icon_info},
                    "html": info_html
                }
                
                //Add this marker to the screen
                newMarker = new google.maps.Marker(new_marker_opts);
        
                //now add a click event listener to the marker so it'll show a popup!
                google.maps.event.addListener(newMarker, 'click', function() {
                    console.log("new Marker clicked");
                    map.panTo(this.position);
                    infowindow.setContent(this.html);
                    infowindow.open(map, this);
                });
}
function addMarker(i, val){
   
    // Populate the popup info window                
    info_html = "<div class = 'venueTitle'>"+val.name+"</div><div class = 'venueAddress'>"+val.addy+"</div><div class = 'gameList'><strong>Games</strong>: "+val.games+"</div>";
   
    // Make all game names lowercase and remove spaces and periods.
            
    var parsedGameName = val.games.toLowerCase();
    parsedGameName = parsedGameName.replace(/[\ \.\,\?\!]/g,'');
            
    icon_info = whichGameMarker(parsedGameName);
            
    // Create an obj to hold the marker (see http://code.google.com/apis/maps/documentation/javascript/reference.html#MarkerOptions)
    this_marker_opts = {
        "position": new google.maps.LatLng(val.lat, val.lon),
        "title": val.name,
        "map": map,
        "icon": {"url": icon_info},
        "html": info_html
    }
                
    // Add this marker to the array of markers
    markers[i] = new google.maps.Marker(this_marker_opts);
                
    // Add a click event listener to the marker so it'll show a popup when clicked.
            
    google.maps.event.addListener(markers[i], 'click', function() {
        map.panTo(this.position);
        infowindow.setContent(this.html);
        infowindow.open(map, this);
    });
}

function errorCall(position){}
function getLoc(position) {
     
    markers = []; //array that will hold all of our markers on the map
    mapdata = {}; //object to hold map data
    mapdata.google_key = "ABQIAAAA6AcpyehWpS7NL84pcYQ6FxS2d7L5ABbYG6wk-7elgqGTvbxyfhTJE7eAtKjYb60_uOSehb1bMky1MQ"; //my API key
    mapdata.latlon = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); //a Google Maps LatLng object (for passing into the map)
    mapdata.user_lat = position.coords.latitude; // Break out individual lat and lng variables.
    mapdata.user_lon = position.coords.longitude; 
    mapdata.options = {
        zoom: 15,
        center: mapdata.latlon, 
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: false,
        mapTypeControl: false
      //can also be SATELLITE, HYBRID, TERRAIN
    };
 
    // Draw the map
    map = new google.maps.Map(document.getElementById("map_canvas"), mapdata.options);
    map.setOptions({styles: styleArray});
    
    // Create a marker to represent the user's location.
    markers[0] = new google.maps.Marker({
        "position": mapdata.latlon, 
        "title": "You",
        "map": map,
    });
 
    // Create an listener that pans to the marker on click...notice that "addListener" is a function of google.maps.event
   
    google.maps.event.addListener(markers[0], 'click', function() {
        map.panTo(this.position);
    });
    
    // Retrieve the locations
    $.get("php/getLoc.php", function(results){
        
        locs = results;

        $.each(locs, function(i, val) {
                  
            addMarker(i, val);
            
        });
    },"json");
}; 


function show_prompt(){
    var finalName;
    var name=prompt("Where are you?\n(e.g. Bob's bar)","");
    if (name!=null && name!=""){
        var games = prompt("Which games are there?\n(e.g. Pac Man, Buck Hunter)", "");
        if (games!=null && games !=""){
           
            var parsedGameName = games.toLowerCase();
            parsedGameName = parsedGameName.replace(/[\ \.\,\?\!]/g,'');
            console.log(parsedGameName);
            icon_info = whichGameMarker(parsedGameName);
            finalName = reformatGameName(parsedGameName);
            
            // Add this new entry to the DB.
            addSomething(name, finalName);  
        }
    }
}
 
function addSomething(venueName, gameName) {

    var yelp_key = "EIk-K2iSTvzj4qLIhiysPg"
    var yelpURL = "http://api.yelp.com/business_review_search?callback=?"; //NOTE the callback for JSONP!
    var yelp_params = {
        "term": venueName,
        "lat": mapdata.user_lat,
        "long": mapdata.user_lon,
        "radius": .35,
        "limit": 1, //was 1
        "ywsid": yelp_key
    }
        
    $.getJSON(yelpURL, yelp_params, function(results) {  //call the Yelp API
    
        locs = results.businesses; //we're only interested in the "businesses" array in the results
        console.log(locs);
        // If no results are found...
        if (locs[0] == null){
            alert("Sorry, that venue wasn't found nearby!");
        } else {
            // Otherwise, check to make sure the location is correct
            var r=confirm("Did you mean "+locs[0].name+"?");
            // If the user clicks yes...
            if (r==true){
                // If so, let's see if this entry is already in the DB.
                var addy = locs[0].address1
                var theName = locs[0].name
                var theLat = locs[0].latitude
                var theLon = locs[0].longitude
                 
                // Check this data in the DB.
		        $.post("php/checkAddLoc.php", { name: theName, games: gameName, lat: theLat, lon: theLon, address: addy, screenname: sn }, function(results){ ;
		            
		            if (results != 1){
                        // The result is not yet in the DB
                        // This is what we want to go in the popup info window         
                        info_html = "<div class = 'venueTitle'>"+theName + "</div><div class = 'venueAddress'>"+addy+"</div><div class = 'gameList'><strong>Games</strong>: " + gameName+"</div>";
                
                        addSingleMarker(theLat,theLon,info_html,icon_info);
                
                        alert("Thanks! Your arcade was added to the map!");
                    }
                    else {
                        // The result is already in the DB.
                        alert("It looks like that venue is already on the map. Thanks!");
                    }
                });
            }
            
            // If the user hits cancel...
            else {
                alert("Sorry, please try again!");
		    }
		}
	});
}
 
$(document).ready(function() {
    navigator.geolocation.getCurrentPosition(getLoc, errorCall, {enableHighAccuracy: true ,maximumAge: 60000});
    checkForScreenName();
    var tagButton = document.getElementById('tagButton');
    tagButton.addEventListener('click', show_prompt, false);
}); 
