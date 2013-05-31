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
 * MAIN EVENTS CLASS
 * HANDLES ALL BUTTON EVENTS
 *
 */
;(function ($, events, window, document, undefined) {
	
	'use strict';
	
	var Event = events.Event = events.Event || ( function () {
		
		var init = function () { createPageEvents(); } ;
		
		var createPageEvents = function () {
			
			$("#header #header-btn").on('click', function (e) {
				e.preventDefault();
				//$("#myid", parent.document.body); 
				$('html, body').animate({ scrollTop: 700 }, 1000);
			});
			$("#header #header-btn2").on('click', function (e) {
				e.preventDefault();
				$('html, body').animate({ scrollTop: 1100 }, 1000);
			});
		
			$("#header #header-btn3, #stay-in-the-now").on('click', function (e) {
				e.preventDefault();
				$("#modal").fadeIn();
				$("#formFields").fadeIn();
				//$('html, body').animate({ scrollTop: 0 }, 1000);
			});
			$("#paceman #spec-link, #paceman-s #spec-link, #paceman-jcw #spec-link").on('click', function (e) {
				e.preventDefault();
				$("#modal").fadeIn();
				$("#formFields").fadeIn();
				$('html, body').animate({ scrollTop: 0 }, 1000);
			});
			$("#modal").on('click', function (e) {
				$("#modal").fadeOut();
				$("#formFields").fadeOut();
				_manager.View.isFormOpen (false);
			});
			$("#close-btn").on('click', function (e) {
				$("#modal").fadeOut();
				$("#formFields").fadeOut();
				_manager.View.isFormOpen (false);
			});
			$("#models-nav #header-btn").on('click', function (e) {
				e.preventDefault();
				_manager.View.changeSpecView('#paceman');
			});
			$("#models-nav #header-btn2").on('click', function (e) {
				e.preventDefault();
				_manager.View.changeSpecView('#paceman-s');
			});
			$("#models-nav #header-btn3").on('click', function (e) {
				e.preventDefault();
				_manager.View.changeSpecView('#paceman-jcw');
			});
			
			$("#header .topBtn").on('mouseover', function (e) {
				$(this).removeClass( "topBtn" );
				$(this).addClass( "topBtn-over" );
			});
			
			$("#header .topBtn").on('mouseleave', function (e) {
				$(this).addClass( "topBtn" );
				$(this).removeClass( "topBtn-over" );
			});
			$("#header-pic").on('mouseover', function (e) {
				$("#color-bubble").hide();
			});
			
	}
	
	var killCarEvnets = function () {
		$('#car').unbind('mousemove');
		$('#car').unbind('mousedown');
		$('#car').unbind('mouseup');
	}
		
	return{ init          : init,
	        killCarEvnets : killCarEvnets
	      };
		
	}());
	
	return{ Event : Event };
	
}(jQuery, window._events = window._events || {}, window, document ));