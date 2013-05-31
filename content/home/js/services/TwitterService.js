/*
 * Rob Thiessen
 * -----------------
 * TWITTER CLASS 
 * ENGLISH VERSION
 * Richmondday Jan - 2013
 * jslint browser: true, maxerr: 50, indent: 4, devel: true, white:true;
 *//*!
 * @dependency jquery-1.7.2.min.js 
 * @dependency jquery.waitforimages.js
 */
 
;(function($, twitter, window, document, undefined) {
	
	"use strict";
	
	var Feed = twitter.Feed = twitter.Feed || (function() {
		
		var Tweets = [];
		var t;
		
     var init = function(){ loadTwitterFeed(); };
		
	  // LOAD TWITTER DATA 
	  var  loadTwitterFeed = function(){ 
	    var numTweets = 50;
		var _url = 'https://api.twitter.com/1/statuses/user_timeline/MINICanada.json?callback=?&count='+numTweets+'&include_rts=1';
        $.getJSON(_url,function(data){
	         
			Tweets = data;
			 t = setTimeout(buildLoopingTweet, 200);
			
			
	
		});
	  
	  }
	  
	  var tweetCount = -1;
	  // ANIMATES A RANDOM TWEET 
	  var buildLoopingTweet = function (){
		  
		  clearTimeout(t);
		  
		  var num = Math.floor( Math.random() * 49 );
		  var tweet = Tweets[num].text;
          var created = parseDate(Tweets[num].created_at);
		  var status  = Tweets[num].id_str;
		  var parsedURL = tweet.parseURL().parseUsername().parseHashtag();
		
		 $("#twitter-wrapper").animate({ top : -100, opacity : 0},{ easing: 'easeInOutCubic',  duration: 1000, complete: function() { backIn() } });
			
			setTimeout(function() {
             var createdDate = '<span class="tweet-title"></span></div><div>';
             tweet = '<div class="tweeter-info"><div class="right"><a href="https://twitter.com/#!/MINICanada/status/'+Tweets[num].id_str+'" target="_blank">'+createdDate+'</a></div></div><span id="tweet-body">' + tweet.parseURL().parseUsername().parseHashtag()+'</span><br><div id="bottom-border"></div>';
			 $("#twitter-wrapper").html('<p><span class="tweet">'+tweet+'</span></p>');
            }, 999);
			
			var backIn = function () {
			$("#twitter-wrapper").css({'top' : '600px'});
		    $("#twitter-wrapper").animate({ opacity : 1, top : -20 }, { easing: 'easeInOutCubic', duration: 1000 });
			}
			
			/*$("#tweet-frame").off();
			$("#tweet-frame").on('click', function () {
				var url = 'https://twitter.com/#!/MuchoBurritoHQ/';
				window.open(url,'_blank');
			});*/
		   
		   
		   t = setTimeout(buildLoopingTweet, 8000);
		   
				
		  
	  }
	  
	  
	  
	  
	  function parseDate(str) {
      var v=str.split(' ');
      return new Date(Date.parse(v[1]+" "+v[2]+", "+v[5]+" "+v[3]+" UTC"));
      }
	  
	  String.prototype.parseURL = function() {
       return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function(url) {
       return url.link(url);
      });
      };
      String.prototype.parseUsername = function() {
      return this.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
        var username = u.replace("@","")
        return u.link("http://twitter.com/"+username);
       });
      };
      String.prototype.parseHashtag = function() {
      return this.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
        var tag = t.replace("#","%23")
        return t.link("http://search.twitter.com/search?q="+tag);
       });
      };
	   
	   return { init : init };

		
    })();

	return { Feed : Feed };
	
}(jQuery, window._twitter = window._twitter || {}, window, document));