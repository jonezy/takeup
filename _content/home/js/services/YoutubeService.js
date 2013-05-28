/*
 * Rob Thiessen
 * -----------------
 * YOUTUBE CLASS 
 * ENGLISH VERSION
 * Richmondday Jan - 2013
 * jslint browser: true, maxerr: 50, indent: 4, devel: true, white:true;
 *//*!
 * @dependency jquery-1.7.2.min.js 
 * @dependency jquery.waitforimages.js
 */
 
;(function($, youtube, window, document, undefined) {
	
	"use strict";
	
	var Channel = youtube.Channel = youtube.Channel || (function() {
		
		var currentLocation = '';
		var wallPosts = [];
	    var lt = false;
	    var vidContainer = $('#div here');
	    var videoViews = [];
	    var videoDuration = [];
	    var videoHashTags = [];
	    var videoTitles = [];
	    var count = -1;
		
	
     var init = function(){ loadYoutube(); };
		

	  // IF FEED FAILS 
	  var loadFailed = function () {  }
	  
	
	  var loadYoutube = function () {
		  
		  $('iframe').each(function() {
           var url = $(this).attr("src");
            var char = "?";
          if(url.indexOf("?") != -1)
                  var char = "&";
          
            $(this).attr("src",url+char+"wmode=transparent");
		  });
		  
	  
	  var list = 'PLTgskouQC1wTAu27sKcVohMWHZWG8InoE'; // COUNTRYMAN PLAYLIST 
	   
	     var feedUrl = 'https://gdata.youtube.com/feeds/api/playlists/'+list;
			
			
			 var str = 'https://gdata.youtube.com/feeds/api/playlists/'+list+'?v=2&alt=jsonc&callback=?';
		     $.getJSON(str, function(json){
			 
			   var data = json["data"];
			   $(data.items).each(function(i, item) {
				   
				   var views = item.video.viewCount + ' Views';
			       var d = item.video.duration + ' Sec';
				   videoHashTags.push(item.video.id );
				   videoTitles.push(item.video.title);
				   videoViews.push(views);
                   videoDuration.push(d);
				 
				   
               });
			   
			   addVideoThumbs();
			   
		    });
		 
	  }
	  
	   var addVideoThumbs = function () {
	   var container = $( '#video-thumbs .youtubeFeed');
	   for( var i = 0; i < videoTitles.length; i++ ){
	       $(container).append('<li><div><a href="http://www.youtube.com/embed/'+videoHashTags[i]+'" class="yt-headline" title="'+videoTitles[i]+'"><img src="http://img.youtube.com/vi/'+videoHashTags[i]+'/2.jpg" /></div></li>\n');
	       }
				
        $(".yt-headline").click(function () {
        loadVideo(this);
		
        return false;
        });
		
		var currPosition = 0; 
      
		// set up stage arrow events 
		$("#t-grad").on('click', function(){
			 
			 if( currPosition > 0 ){
			  currPosition--;
			  var next = currPosition * 150;
			  var num = Math.abs(next) * -1;
			 $("#feed-wrapper").animate({ top : num }, { duration: 500, easing: 'linear'});
			 }
			 
			 
		});
		
		$("#b-grad").on('click', function(){
			 
			if( currPosition < 1 ){
			  currPosition++;
			  var next = currPosition * 150;
			  var num = Math.abs(next) * -1;
			 $("#feed-wrapper").animate({ top : num }, { duration: 500, easing: 'linear'});
			 }
			
			
		});
				
	  }
	  
	  var loadVideo = function(video) {
		  console.log( video );
          $('#video-player').html([ '<iframe title="', video.title, '" width="460" height="267" src="', video.href+'?wmode=transparent', '" frameborder="0" wmode="Opaque"></iframe>'].join(""));
		 // dcsMultiTrack( 'DCS.dcsuri', ' /Selected_Video/'+video.title+'/','WT.cg_n', 'PS:New Cars:Model:R61', 'WT.dl', '0');
          return false;
       }
	  
	   
	   return { init : init };

		
    })();

	return { Channel : Channel };
	
}(jQuery, window._youtube = window._youtube || {}, window, document));