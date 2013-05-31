/*
 * Rob Thiessen
 * -----------------
 * MINI HOME PAGE
 * ENGLISH VERSION
 * Richmondday Jan - 2013
 * jslint browser: true, maxerr: 50, indent: 4, devel: true, white:true;
 *//*!
 * @dependency jquery-1.7.2.min.js 
 * @dependency jquery.waitforimages.js
 */
 
;(function($, model, window, document, undefined) {
	
	"use strict";
	
	var Model = model.Model = model.Model || (function() {
		
		$(document).ready(function() {$('body').waitForImages(function() { init(); });});
		
        var init = function(){
			
			
			// get geo location
			_geo.Locate.init();
			
			// GRAB THE API DATA 
			_api.Api.init();
			
			// LOAD YOUTUBE -- // 
			_youtube.Channel.init();
			
			// LOAD TWITTER FEED -- // 
			_twitter.Feed.init();
			
			
		   $("#east-banner #legal-btn").on('click', function (e) {
				e.preventDefault();
				$("#east-banner #legal-popup").fadeIn();
			});
			
			$("#central-banner #legal-btn").on('click', function (e) {
				e.preventDefault();
				$("#central-banner #legal-popup").fadeIn();
			});
			
			$("#west-banner #legal-btn").on('click', function (e) {
				e.preventDefault();
				$("#west-banner #legal-popup").fadeIn();
			});
			
			$("#central-banner #close-popup").on('click', function (e) {
				e.preventDefault();
				$("#central-banner #legal-popup").fadeOut();
			});
			$("#west-banner #close-popup").on('click', function (e) {
				e.preventDefault();
				$("#west-banner #legal-popup").fadeOut();
			});
			
			$("#east-banner #close-popup").on('click', function (e) {
				e.preventDefault();
				$("#east-banner #legal-popup").fadeOut();
			});
			
			
	
			
		};
		

		
    })();

	return { Model : Model };
	
}(jQuery, window._model = window._model || {}, window, document));