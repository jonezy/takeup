/*
 * Rob Thiessen
 * -----------------
 * MINI Paceman
 * ENGLISH VERSION
 * Richmondday Jan - 2013
 * jslint browser: true, maxerr: 50, indent: 4, devel: true, white:true;
 *//*!
 * @dependency jquery-1.7.2.min.js 
 * @dependency jquery.waitforimages.js
 *
 * MAIN PAGE EVENTS CLASS
 * HANDLES ALL BUTTON EVENTS
 *
 */

;(function ($, pageEvents, window, document, undefined) {
	
	'use strict';
	
	var Events = pageEvents.Events = pageEvents.Events || ( function () {
		
		var divs = ['#specs','#design','#equipment','#accessories','#safety','#finacial'];
		
		$(document).ready(function () { init(); } );
	 
		var init = function () {
			
			$(".thumb-item").on( 'click', function () {
				var d = $(this).find('#item-title').html();
				//console.log($(this).find('#item-title').html());
				openView(d);
				$(".thumb-item img").css({'border-width':'1px','border-color' : 'grey'});
				$(".thumb-item #item-title").css({'top' : '87px'});
				$(this).find('img').css({'border-width':'5px', 'border-color' : 'white'});
				$(this).find('#item-title').css({'top' : '95px'});
				
			});
			
		}
		
		
	   var openView = function (div) {
		
		if(div == 'build this mini' || div == 'book a test drive'){
			window.open('http://buildmymini.ca');
			return;
		}
		 
		var d = "#"+div;
		for( var i = 0; i < divs.length; i++ ){
		if( d.toLowerCase() == divs[i].toLowerCase() ){
			$(divs[i]).fadeIn(800);
		  }else{
			 $(divs[i]).fadeOut(500);
		  }
		  
		  
		}
		
		if( div == 'mini financial services' ){ $('#finacial').fadeIn(800); }
		
	   }
		
		
		
	}());
	
	
	
	return{ Events : Events };
	
	
}(jQuery, window._pageEvents = window._pageEvents || {}, window, document ));