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
	
		// MAIN INIT -- CHECKS PERMISSIONS 
     var init = function(){getGeoLocation();};
		
	  
	  // RETURN USERS GEO LOCATION 
	  var getGeoLocation = function (){
		  
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
		 }); 
		  
		if (Modernizr.geolocation) {
         navigator.geolocation.getCurrentPosition(showMiniLocations,show_error,{maximumAge:60000, timeout:5000, enableHighAccuracy:false});
        } else {
        // no native support; maybe try a fallback?
		show_error();
        }
		 
	
	    $.support.cors = true; 
		$.ajaxSetup({ cache: false });
		$.ajax({
		type: "GET",
        url: 'http://buildmymini.ca/v1/en/retailers/?appid=NjY2NjY2NjY2Ng==',    
        dataType:($.browser.msie) ? "text" : "json", 
		cache : false,
		ifModified : true,
		crossDomain: true, 
		accepts: {
        json: "text/json",
        text: "text/json"
        },
        success: function(data){ dataRecieved(data) },  
        error: function (xhr, errorString, exception) { console.log( "xhr.status="+xhr.status+" error="+errorString+" exception="+exception ); }   
        });
	
	   
	  }
	  
	  
	  // RETURN FROM API -- // 
	  var dataRecieved = function (data) {
		  retailers = data;
	  }
	  
	  // RETURNS A LIST OF LOCATIONS PER PROVINCE 
	  var getListOfRetailersPerProvince = function(p){
		  retailersAddress = [];
		for( var i = 0; i < retailers.length; i++){
		  //if(retailers[i].Province == p ){
		  var actualAddress =  retailers[i].Address + ", " + retailers[i].City +" ,"+ retailers[i].Province
	      retailersAddress.push(actualAddress);
		 //}
		}
		
		recursive = setTimeout(function () {
			getLatLng(retailersAddress[0]);
		},1000);
		
	  }
	  var timeout = 100;
	 
	  // GEOCODE INITAL ADDRESS 
	  var getLatLng = function ( _address ) {
		clearTimeout(recursive);
		  
		
		var addr = retailersAddress[gCount];
		var geoCodeObj = new google.maps.Geocoder();
		geoCodeObj.geocode( { 'address': addr }, function(results, status) { 
		if (status == google.maps.GeocoderStatus.OK) {
			gCount++;
			
			if( gCount < retailersAddress.length ){
			
			   recursive = setTimeout(function () {
			   getLatLng(retailersAddress[gCount]);
		       },timeout);
			   
		   }else{
			  clearTimeout(recursive); 
			  searchGEO(meAddress);
		   }
			
		var userLocation = results[0].geometry.location; 
		retailersLatLng.push({addr : addr, ltlg : userLocation});
		//console.log( " " + userLocation );
		
		   } else {
			   
			if( gCount < retailersAddress.length ){
			   recursive = setTimeout(function () {
			   getLatLng(retailersAddress[gCount]);
		       },(timeout * 3));
			   
		   }else{
			  clearTimeout(recursive); 
		   }
			 
           }
	     });
		 
		 
		 
		 
		 
	  }
	  
	  // display error - if no geo code was found 
	  var show_error = function (err) {
		 
		  if( lt == false ){
		  console.log( " User Denied + Display Popup " ); 
		  $("#location-pop-up").fadeIn();
		  $("#form-modal").fadeIn();
		  }
	
		  if( typeof err != 'undefined'){
		  // console( err.code );
		   $("#location-pop-up").fadeIn();
		  $("#form-modal").fadeIn();
		  }
		  
		  var img = '<img src="images/find-retailer-img.jpg" alt="Locate A Dealer Near You!" />';
		  $("#locate-dealers").html(img);
		  $("#locate-loader").hide();
		  
		  
      }
	  
	  // found a users location -- Show Mini Locations
	   var showMiniLocations = function (position){
	     lt = true;
	     $("#location-pop-up").hide();
		 $("#form-modal").hide();
		 
		 $("#locate-dealers").html('');
		 
		  var lat = position.coords.latitude;
          var lng = position.coords.longitude;
		  geoLat = lat;
		  geoLon = lng;
		  setTimeout(function () {
          codeLatLng(lat, lng);
		  
		  }, 2000);
		 
		 
       }
	   
	var geocoder = new google.maps.Geocoder(); 
	function codeLatLng(lat, lng) {

    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        // console.log(results)
        if (results[1]) {
        
		    getListOfRetailersPerProvince(results[0].address_components[3].long_name);
			meAddress = results[0].formatted_address;
			
			setTimeout(function () {
			//searchGEO(meAddress);
			}, 2000);
			
	
		var userCity = (results[0].address_components[1].long_name)
        //find country name
             for (var i=0; i<results[0].address_components.length; i++) {
             for (var b=0;b<results[0].address_components[i].types.length;b++) {

            //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
           
                    var city= results[0].address_components[i];
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
	   
	   
	    google.maps.LatLng.prototype.distanceFrom = function(latlng) {
        var lat = [this.lat(), latlng.lat()]
        var lng = [this.lng(), latlng.lng()]
        var R = 6378137;
        var dLat = (lat[1]-lat[0]) * Math.PI / 180;
        var dLng = (lng[1]-lng[0]) * Math.PI / 180;
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat[0] * Math.PI / 180 ) * Math.cos(lat[1] * Math.PI / 180 ) *
        Math.sin(dLng/2) * Math.sin(dLng/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        return Math.round(d);
        }
		
		var searchGEO = function ( _address ) {

		var addr = _address;
		var l = [];
		
		for(var i = 0; i < retailersLatLng.length; i++ ){
			var from = new google.maps.LatLng(geoLat,geoLon);
			var dist = retailersLatLng[i].ltlg.distanceFrom(from);
			
			l.push({ltlng : from, addr : retailersLatLng[i].addr, dist : dist/1000});
	    }
		
        var ttt = l;
		ttt.sort(function(a,b) { return a.dist - b.dist; });
		closeRetailers = [];
		
		for(var g = 0; g < 3; g++){
		
		for(var gg = 0; gg < retailers.length; gg++ ){
			
			if( typeof ttt[g] != 'undefined' ){
			
			var newAddr = ttt[g].addr.split(',');

		    if( newAddr[0] == retailers[gg].Address ){
					//console.log ( retailers[gg].Name + " :: " + retailers[gg].Address  + " :: " +  retailers[gg].Postal);
					var postal = retailers[gg].Postal +" "+ retailers[gg].City;
					closeRetailers.push({dName : retailers[gg].Name, addr : retailers[gg].Address, postal : postal, email : retailers[gg].Email, website : retailers[gg].Website  })
				}
				
		      }// end if
			 
		    } 
			 
		  }
		 
		  setClosestLocations();
		
	  }
	   

	   var setClosestLocations = function () {
		   
		  $("#locate-dealers").html('');
		  var headerImg = '<img src="images/retailers-title.jpg"/>';
		  $("#locate-dealers").append(headerImg);
		  $("#locate-loader").hide();
		  
		 for( var i = 0; i < closeRetailers.length; i++){
			 // console.log("SHOULD ADD THIS " + closeRetailers[i].addr);
		      var dName = closeRetailers[i].dName;
			  var addr = closeRetailers[i].addr;
			  var postal = closeRetailers[i].postal;
			  var email = closeRetailers[i].email;
			  var website = closeRetailers[i].website;
		      var dealer = '<div id="dealer"><span class="d-title">'+dName+'</span><br>';
				   dealer+= '<span class="d-grey">'+addr+'</span><br>';
				   dealer+= '<span class="d-grey">'+postal+'</span><br>';
				   dealer+= '<span class="d-title"> <a href="mailto:'+email+'?subject=Contact from MINI.ca" target="_blank"> > Contact Retailer</a></span><br>';
				   dealer+= '<span class="d-title"> <a href="'+website+'" target="_blank"> > Visit Website</a></span>';
				  
			dealer+='</div>';
		    $("#locate-dealers").append(dealer);
		
				  
		  }
		   
	   }
	   
	   
	   // RETURN LAT LON FROM USER SELECTED CITY AND PROVINCE 
	    var getSelectedLatLng = function (c,p) {
			var cityProvince =  p;
			
			for( var i = 0; i < retailers.length; i++ ){
				if( c == retailers[i].City ){
					 cityProvince = c +', '+ p;
				}	
			}

		  geocoder.geocode( { 'address': cityProvince}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            //console.log("location : " + results[0].geometry.location.lat() + " " +results[0].geometry.location.lng()); 
			geoLat = results[0].geometry.location.lat();
			geoLon = results[0].geometry.location.lng();
			
			searchGEO(userCity+', '+userProvince);
          } else {
            alert("ERROR ::  " + status);
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
		  setTimeout(function () {
		  getSelectedLatLng(userCity,userProvince);
			}, 2000);
		 
		  
	
		 /* if( count == 0 ){
		  $("#locate-dealers").html('');
		  var dImg = '<img src="images/find-retailer-img.jpg" alt="Locate A Dealer Near You!" />';
		  $("#locate-dealers").html(dImg);
		  }*/
		  
	  }
	  
	  

	return{ init : init };
		
		
    })();

	return { Locate : Locate };
	
}(jQuery, window._geo = window._geo || {}, window, document));