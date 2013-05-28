/*
 * Rob Thiessen
 * -----------------
 * CREATE - RETURN - COOKIES 
 * ENGLISH VERSION
 * Richmondday Jan - 2013
 * jslint browser: true, maxerr: 50, indent: 4, devel: true, white:true;
 *//*!
 * @dependency jquery-1.7.2.min.js 
 * @dependency jquery.waitforimages.js
 * 
 *
 */
 
;(function ($, cookie, window, document, undefined ){
	
	'use strict'; 
	
	var Create = cookie.Create = cookie.Create || ( function () {
	    
	var Cookie = function (name,value,days) {
	    if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	    } 
		else var expires = "";
	    document.cookie = name+"="+value+expires+"; path=/";
    }
   
	
	
	
	// CHECK IF A COOKIE IS AVAILABLE --// 
    var readCookie = function (name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	  }
	  return null;
    }
	
	
	// REMOVE COOKIE BY NAME 
    var eraseCookie = function (name) { Cookie(name,"",-1); }
		
		
		
		
		
		
		
		return{ 
		        Cookie      : Cookie,
				readCookie  : readCookie,
				eraseCookie : eraseCookie 
		      };
		
		
	}());

	return{ Create : Create  }
	
}(jQuery, window._cookie = window._cookie || {}, window, document ));