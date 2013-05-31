/*
 * Rob Thiessen
 * -----------------
 * MINI HOME PAGE 
 * GET AND SAVE GEO LOCATION
 * ENGLISH VERSION
 * Richmondday Jan - 2013
 * jslint browser: true, maxerr: 50, indent: 4, devel: true, white:true;
 *//*!
 * @dependency jquery-1.7.2.min.js 
 * @dependency jquery.waitforimages.js
 */
 
;(function($, geo, window, document, undefined) {
	
	"use strict";
	
	var Locate =  geo.Locate = geo.Locate || (function() {
		
		var currentLocation = '';
		var wallPosts = [];
	    var lt = false;
		var userCity = '';
		var userProvince = '';
		var retailers = [];
		var l = [];
		var geoLat = '';
		var geoLon = '';
		var meAddress = '';
		var retailersAddress = [];
		var retailersLatLng = [];
		var closeRetailers = [];
		var gCount = 0;
	    var recursive;
		var checkTimeout;
		var region = 'noGeo';
		var geocoder = new google.maps.Geocoder(); 
		var dealerLats = [];
		  	
		var provinceLatLons = [ { pro : 'British Columbia', lat :55 ,lon:-125.15},
		{ pro : 'Alberta', lat :54.4 ,lon:-115},
		{ pro : 'Manitoba', lat :55.3 ,lon:-97},
		{ pro : 'New Brunswick', lat :46.5 ,  lon:-66.3},
		{ pro : 'Newfoundland and Labrador', lat :49 ,  lon:-55},
		{ pro : 'Nova Scotia', lat :45.1 ,  lon:-63},
		{ pro : 'Ontario', lat :48 ,  lon:-83},
		{ pro : 'Prince Edward Island', lat :46.2 ,  lon:-63.2},
		{ pro : 'Quebec', lat :48 ,  lon:-74},
		{ pro : 'Saskatchewan', lat :54.4 ,  lon:-106},
		{ pro : 'Northwest Territories', lat :63 ,  lon:-118},
		{ pro : 'Nunavut', lat :66 ,  lon:-85},
		{ pro : 'Yukon', lat :63 ,  lon:-135},
		];
		
	
		// MAIN INIT -- CHECKS PERMISSIONS 
     var init = function(){ loadLocalDB(); getGeoLocation(); };
		
	  
	  // RETURN USERS GEO LOCATION 
	  var getGeoLocation = function (){
		 $("#find-dealer-title").html('');
		 $("#send-btn").on('click',function () {
		 $("#location-pop-up").fadeOut();
		 $("#form-modal").fadeOut();
		 getUserSelectedData();
		
		 });
		 
		 $("#location-pop-up").keypress(function(e) {
         if(e.which == 13) {
		 $("#location-pop-up").fadeOut();
		 $("#form-modal").fadeOut();
          getUserSelectedData();
         }
         });
		 
		  $("#close-form-btn").on('click',function () {
		  $("#location-pop-up").fadeOut();
		  $("#form-modal").fadeOut();
		  _banner.Rotator.init();
		 }); 
		  
		 
		var cookie =  _cookie.Create.readCookie('province');

		if(cookie != null){
			 
			 loadLocalDB();
			 clearTimeout(checkTimeout);
			 
			 setTimeout(function () {
				 getListOfRetailersPerProvince(cookie);
			 },500);
			 
			 
		 }else{
		
		if (Modernizr.geolocation) {
			checkTimeout = setTimeout( show_error , 4000);
         navigator.geolocation.getCurrentPosition( showMiniLocations ,show_error,{maximumAge:20000, timeout:3000, enableHighAccuracy:false});
        } else {
        // no native support; maybe try a fallback?
		show_error();
        }
		
		}
	
	    $.support.cors = true; 
		$.ajaxSetup({ cache: false });
		$.ajax({
		type: "GET",
        url: 'http://api.buildmymini.ca/v1/en/retailers/?appid=NjY2NjY2NjY2Ng==',    
        dataType:($.browser.msie) ? "text" : "json", 
		cache : false,
		ifModified : true,
		crossDomain: true, 
		accepts: {
        json: "text/json",
        text: "text/json"
        },
        success: function(data){ dataRecieved(data) },  
        error: function (xhr, errorString, exception) {/* console.log( "xhr.status="+xhr.status+" error="+errorString+" exception="+exception );*/ loadLocalDB(); }   
        });
	
	   
	  }
	  
	  
	  var loadLocalDB = function () {
	    var localData = _retailers.API.data;  
			dataRecieved(localData);
		}
	  
	  
	  // RETURN FROM API -- // 
	  var dataRecieved = function (data) {
		  retailers = data;
	  }
	  
	  // RETURNS A LIST OF LOCATIONS PER PROVINCE 
	  var getListOfRetailersPerProvince = function(p){
		  retailersAddress = [];
		  displayRegionData(p);
		  dealerLats = [];
		  
		  _cookie.Create.Cookie('province', p , 7 );
		  
		  var c = 0;
		  $("#find-dealer-title").html('');
		  $("#locate-dealers").html('');
		  var headerImg = '<img src="images/retailers-title.jpg"/>';
		  $("#find-dealer-title").html(headerImg);
		  $("#locate-loader").hide();
		  $("#locate-dealers").css({'height':'280px', 'top' : '280px'});
		 
		  for( var i = 0; i < retailers.length; i++){
		      if( retailers[i].Province == p ){
			  c++;
			  
			  var dealerMaps = retailers[i].MapLink;
			  var mapFullUrl = dealerMaps.split('&ll=');
			  
			  if(typeof mapFullUrl[1] != 'undefined' ){
			  
			  var latLonFull = mapFullUrl[1].split('&spn=');
			  var fullLat = latLonFull[0].split(',');
              dealerLats.push({Distance : '', Address : retailers[i].Address, City : retailers[i].City, Province: retailers[i].Province, Name : retailers[i].Name, Email : retailers[i].Email, Website : retailers[i].Website, lat : fullLat[0], lon : fullLat[1] }); 
			  
			  }
			  
			  
			
		 }
	
		}// end main loop
		
		      
		      // GEO CODE GEOLOCATION 
			  // SET UNIQUE POSITIONS 
		      geocoder.geocode( { 'address': p }, function(results, status) {
			  
              if (status == google.maps.GeocoderStatus.OK) {
            
			  for( var ii = 0; ii < dealerLats.length; ii++ ) { 
			  var geoLat = results[0].geometry.location.lat();
			  var geoLon = results[0].geometry.location.lng();
			  var a = new google.maps.LatLng(geoLat, geoLon);
			  
			  var b = new google.maps.LatLng( dealerLats[ii].lat, dealerLats[ii].lon );
			  var distance = google.maps.geometry.spherical.computeDistanceBetween (a, b);
			  dealerLats[ii].Distance = distance;
			  } 
			  displayDealerLocations();
              } else {
              // alert("ERROR ::  " + status);
              }
              });
		
		// if nothing is return -- 
		// pull generic data feed
		if( c == 0 ){
		  $("#locate-dealers").html('');
		  var img = '<a href="http://www.mini.ca/en/select_dealer/index.jsp?bcId=/en/index.html" target="_parent"><img src="images/find-retailer-img.jpg" alt="Locate A Dealer Near You!" border="0" /></a>';
		  $("#locate-dealers").html(img);
		  $("#locate-dealers").css({'height':'380px', 'top' : '210px'});
		  $("#user-provice").css({'top' : '575px' });
		  $("#find-dealer-title").html('');
		  $("#locate-loader").hide();
		}
		
	  }
	  
	  
	  // SORTS LOCAITONS BY DISTANCE -- 
	  // DISPLAYS THE LOCATIONS 
	  var displayDealerLocations = function () {
		  
		  dealerLats.sort(function(a,b) { return a.Distance - b.Distance; });
		  for(var i = 0; i < dealerLats.length; i++){
		   // console.log( i + " :: " + dealerLats[i].Name + " :: " + dealerLats[i].Distance);  
		   var actualAddress =  dealerLats[i].Address + ", " + dealerLats[i].City +" ,"+ dealerLats[i].Province;
	       retailersAddress.push(actualAddress);
		   var dName = dealerLats[i].Name;
		   var addr = dealerLats[i].Address;
		   var postal = dealerLats[i].Postal + ", " + dealerLats[i].City ;
		   var email = dealerLats[i].Email;
		   var website = dealerLats[i].Website;
		   var dealer = '<div id="dealer"><span class="d-title">'+dName+'</span><br>';
		   dealer+= '<span class="d-grey">'+addr+'</span><br>';
		   dealer+= '<span class="d-grey">'+postal+'</span><br>';
		   dealer+= '<span class="d-title"> <a href="mailto:'+email+'?subject=Contact from MINI.ca" target="_blank"> > Contact Retailer</a></span><br>';
		   dealer+= '<span class="d-title"> <a href="'+website+'" target="_parent"> > Visit Website</a></span>';
		   dealer+='</div>';
		   $("#locate-dealers").append(dealer);
		
		  }
		  
		  var userDisplay = '';
		  if(typeof dealerLats[0] != 'undefined' ){
		  userDisplay = 'You’re currently in '+ dealerLats[0].Province +' <span class="change-location"> <a href="#">( CHANGE )</a> </span>';
		  $("#user-provice").css({'top' : '565px' });
		  }else{
		  userDisplay = 'You’re currently in '+ userProvince +' <span class="change-location"> <a href="#">( CHANGE )</a> </span>';
		  $("#user-provice").css({'top' : '575px' });
		  }
		  
		  
		  $("#user-provice").html(userDisplay);
		  
		  $(".change-location").on('click', function () {
			  $("#location-pop-up").fadeIn();
		      $("#form-modal").fadeIn();
		  });
		  
		
	  }
	  
	  
	  
	   // DISPLAY REGION DATA 
	  var displayRegionData = function (p) {
		  
	  var regions = [{reg : 'Central', province : 'Ontario'},{reg : 'East', province : 'New Brunswick'},{reg : 'East', province : 'Newfoundland'},{reg : 'East', province : 'Nova Scotia'},{reg : 'East', province : 'Prince Edward Island'},{reg : 'East', province : 'Quebec'},{reg : 'West', province : 'Alberta'},{reg : 'West', province : 'British Columbia'},{reg : 'West', province : 'Manitoba'},{reg : 'West', province : 'Northwest Territories'},{reg : 'West', province : 'Nunavut'},{reg : 'West', province : 'Saskatchewan'},{reg : 'West', province : 'Yukon'}];
	  
	    var r;
		region = 'noGeo';
	    for(var i = 0; i < regions.length; i++){
	     if( regions[ i ].province == p ){
				 
		r = $.trim(regions[ i ].reg);
		region = r;
		var img = '<img src="images/banner-images/NoGeo.jpg"/>'; 
		if(r == 'East'){ $("#central-banner").fadeOut(); $("#geo-banner").fadeIn(); _banner.Rotator.noGeoAnimate(); }
		if(r == 'West'){ $("#central-banner").fadeIn(); $("#geo-banner").fadeOut(); _banner.Rotator.centralAnimate(); }
		if(r == 'Central'){ $("#central-banner").fadeIn(); $("#geo-banner").fadeOut(); _banner.Rotator.centralAnimate(); }
		
			  }
			 
		  }
		  
		  _banner.Rotator.init(region);
		  
	  }
	  
	 
	
	  
	  // display error - if no geo code was found 
	  var show_error = function (err) {
		  clearTimeout(checkTimeout);
		  $("#find-dealer-title").html('');
	
		 
		  if( lt == false ){
		  $("#location-pop-up").fadeIn();
		  $("#form-modal").fadeIn();
		  $("#find-dealer-title").html('');
		  }
	
		  if( typeof err != 'undefined'){
		  $("#location-pop-up").fadeIn();
		  $("#form-modal").fadeIn();
		  $("#find-dealer-title").html('');
		  }
		  
		  var img = '<a href="http://www.mini.ca/en/select_dealer/index.jsp?bcId=/en/index.html" target="_parent"><img src="images/find-retailer-img.jpg" alt="Locate A Dealer Near You!" border="0" /></a>';
		  $("#locate-dealers").html(img);
		  $("#locate-loader").hide();
		  $("#find-dealer-title").html('');
		  
		  $("#locate-dealers").css({'height':'380', 'top' : '210'});
      }
	  
	  // found a users location -- Show Mini Locations
	   var showMiniLocations = function (position){
		  clearTimeout(checkTimeout);
	      lt = true;
		  var lat = position.coords.latitude;
          var lng = position.coords.longitude;
		  geoLat = lat;
		  geoLon = lng;
		  setTimeout(function () {
          codeLatLng(lat, lng);
		  }, 100);
		 
       }
	   
	var geocoder = new google.maps.Geocoder(); 
	function codeLatLng(lat, lng) {

    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        // console.log(results)
        if (results[1]) {

		var userCity = (results[0].address_components[1].long_name)
        //find country name
             for (var i=0; i<results[0].address_components.length; i++) {
             for (var b=0;b<results[0].address_components[i].types.length;b++) {

            //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                    var city= results[0].address_components[i];
					getListOfRetailersPerProvince(results[0].address_components[i].long_name);
                    break;
                }
            }
        }
            // ADDING PARSER HERE 
            } else {
             alert("No results found");
            }
            } else {
             alert("Geocoder failed due to: " + status);
           }
         });
       }
	  
	   // IF THE USER IS SELECTING PROVINCE AND CITY --// 
	   var getUserSelectedData = function (c,p) {
		 
		  if(typeof p != 'undefined' ){
		  userCity = c;
          userProvince = p;
		  }else{
		  userCity = $("#city").val();
          userProvince = $("#province option:selected").text();  
		  }
		  getListOfRetailersPerProvince(userProvince);
		 
	  }
	  
	 
	return{ init : init };

    })();

	return { Locate : Locate };
	
}(jQuery, window._geo = window._geo || {}, window, document));