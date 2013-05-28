/*
 * Rob Thiessen
 * -----------------
 * MINI BANNER ROTATOR 
 * ENGLISH VERSION
 * Richmondday Jan - 2013
 * jslint browser: true, maxerr: 50, indent: 4, devel: true, white:true;
 *//*!
 * @dependency jquery-1.7.2.min.js 
 * @dependency jquery.waitforimages.js
 */
 
;(function($, banner, window, document, undefined) {
	
	"use strict";
	
	var Rotator = banner.Rotator = banner.Rotator || (function() {
		
		
		var bannerCount = 0;
		var timer;
		var REGION = '';
		var mouseIsOver = false;
		var banners = [];
		var currentBanner = '';
		
		var reset = function (){
			bannerCount = 0;
		}
		
        var init = function(region, arr){
			REGION = region;
			banners = arr;
			
			
			timer = setTimeout(switchBanner, 100);
			
			setTimeout(function () {
			$("#banner-wrapper").on('mouseover', function () {
				clearTimeout(timer);clearTimeout(timer);
				//console.log( "MOVER" );
				mouseIsOver = true;
				
			});
			$("#banner-wrapper").on('mouseleave', function () {
				clearTimeout(timer);
				timer = setTimeout(switchBanner, 9000);
				//console.log( "MOut" );
				mouseIsOver = false;
				
			});
			
			},2000);
			
			$('.banner-item-1').css({'background-color':'grey'});
		   
			$('.banner-item-1').on('click', function () {
				clearTimeout(timer);
				buttonHome();
				$(this).css({'background-color':'grey'});
				bannerCount = 0;
				switchBanner();
				
			});
			
			$('.banner-item-2').on('click', function () {
				clearTimeout(timer);
				buttonHome();
				$(this).css({'background-color':'grey'});
				bannerCount = 1;
				switchBanner();
			    
			});
			
			$('.banner-item-3').on('click', function () {
				clearTimeout(timer);
				buttonHome();
				$(this).css({'background-color':'grey'});
				bannerCount = 2;
				switchBanner();
				
			});
			
			$('.banner-item-4').on('click', function () {
				clearTimeout(timer);
				buttonHome();
				$(this).css({'background-color':'grey'});
				bannerCount = 3;
				switchBanner();
				
			});
			
			$('.banner-item-5').on('click', function () {
				clearTimeout(timer);
				buttonHome();
				$(this).css({'background-color':'grey'});
				bannerCount = 4;
				switchBanner();
				
			});
			
			$('.banner-item-6').on('click', function () {
				clearTimeout(timer);
				buttonHome();
				$(this).css({'background-color':'grey'});
				bannerCount = 5;
				switchBanner();
				
			});
		
			
		};
		
		var buttonHome = function () {
			$(".banner-item-1,.banner-item-2,.banner-item-3,.banner-item-4,.banner-item-5,.banner-item-6").css({'backgroundColor':'transparent'});
		}
		
		
		var switchBanner = function () {
			clearTimeout(timer);
			
			buttonHome();
			currentBanner = banners[bannerCount];
			
			for(var i = 0; i < banners.length; i++){
				
				if( currentBanner === banners[i]){
					$(currentBanner).fadeIn();
					
					if( currentBanner == '#geo-banner'){ noGeoAnimate(); $('.banner-item-1').css({'background-color':'grey'}); };
					if( currentBanner == '#east-banner'){ eastAnimate(); $('.banner-item-1').css({'background-color':'grey'}); };
					if( currentBanner == '#central-banner'){ centralAnimate(); $('.banner-item-1').css({'background-color':'grey'});};
					if( currentBanner == '#west-banner'){ westAnimate(); $('.banner-item-1').css({'background-color':'grey'});};
					if( currentBanner == '#slide-2'){ startBanner2();  $('.banner-item-6').css({'background-color':'grey'});};
					if( currentBanner == '#slide-3'){ slide3Animate(); $('.banner-item-3').css({'background-color':'grey'});};
					if( currentBanner == '#slide-4'){ slide4Animate(); $('.banner-item-4').css({'background-color':'grey'});};
					if( currentBanner == '#slide-5'){ slide5Animate(); $('.banner-item-5').css({'background-color':'grey'});};
					if( currentBanner == '#slide-6'){ slide6Animate(); $('.banner-item-2').css({'background-color':'grey'});};
					
				}else{
					$(banners[i]).fadeOut();
					//console.log( currentBanner +  " ELSE" );
				}
				
			}
			
			if(mouseIsOver === false){
			timer = setTimeout(switchBanner, 9000);
			}
			
			bannerCount++;
			if(bannerCount > banners.length-1){
				bannerCount = 0;
			}
			
		}
		
		/* GEO BANNER ANIMATION */
		var centralAnimate = function () {
			
			$("#central-banner #banner-cars").hide();
			$("#central-banner #left-deal").hide();
			$("#central-banner #right-deal").hide();
			$("#central-banner #no-charge-logo").hide();
			$("#central-banner #banner-btns").hide();
			$("#central-banner #offer-title").hide();
			$("#central-banner #legal-btn").hide();
			$("#central-banner #bg").hide();
			$("#central-banner .title-40").hide();
			$("#central-banner .sub-title-white").hide();
			
			$("#central-banner #bg").animate({ opacity : 0 }, { duration: 10, easing: 'easeInOutBack',complete: function(){
			$("#central-banner #bg").css({'display':'block', 'top':'580px'});
			$("#central-banner #bg").animate({ opacity : 1 , top : 20}, { duration: 1000, easing: 'easeInOutBack' }); 
			    $("#central-banner #banner-cars").stop(true,true).animate({ opacity : 0, top : 700 }, { duration: .5, easing: 'easeInOutBack',complete: function(){
			    $("#central-banner #banner-cars").css({'display':'block', 'top':'710px'});
			    $("#central-banner #banner-cars").animate({ opacity : 1 , top : 210}, { duration: 1100, easing: 'easeInOutBack', complete: function () { console.log('complete'); }}); 
				
				     setTimeout(function (){
				     $("#central-banner #right-deal").css({ opacity: 0 });
			         $("#central-banner #right-deal").css({'display':'block', 'left':'900px'});
			         $("#central-banner #right-deal").animate({ opacity : 1 , left : 650 }, { duration: 1100, easing: 'easeInOutBack' }); 
					 },800);
				
				     setTimeout(function (){
				     $("#central-banner #left-deal").css({ opacity: 0 });
			         $("#central-banner #left-deal").css({'display':'block', 'left':'-200px'});
			         $("#central-banner #left-deal").animate({ opacity : 1 , left : 20 }, { duration: 1100, easing: 'easeInOutBack' }); 
					 },1200);
					 
					 
					 setTimeout(function (){
				     $("#central-banner .title-40").css({ opacity: 0 });
			         $("#central-banner .title-40").css({'display':'block', 'left':'-700px'});
			         $("#central-banner .title-40").animate({ opacity : 1 , left : 20 }, { duration: 1100, easing: 'easeInOutBack' }); 
					 },1100);
					 
					  setTimeout(function (){
				     $("#central-banner .sub-title-white").css({ opacity: 0 });
			         $("#central-banner .sub-title-white").css({'display':'block', 'left':'-700px'});
			         $("#central-banner .sub-title-white").animate({ opacity : 1 , left : 25 }, { duration: 1100, easing: 'easeInOutBack' }); 
					 },1400);
					 
					 setTimeout(function () {
						$("#central-banner #banner-btns").fadeIn();
			            $("#central-banner #offer-title").fadeIn();
			            $("#central-banner #legal-btn").fadeIn(); 
						$("#central-banner #no-charge-logo").fadeIn();
					 },1600);
				
			     
			     }}); 
			 }}); 
  
			 
			 
			 
			 
			 
		}
		
		/* GEO BANNER ANIMATION */
		var eastAnimate = function () {
			
			$("#east-banner #banner-cars").hide();
			$("#east-banner #left-deal").hide();
			$("#east-banner #right-deal").hide();
			$("#east-banner #no-charge-logo").hide();
			$("#east-banner #banner-btns").hide();
			$("#east-banner #offer-title").hide();
			$("#east-banner #legal-btn").hide();
			$("#east-banner #bg").hide();
			$("#east-banner .title-40").hide();
			$("#east-banner .sub-title-white").hide();
			
			$("#east-banner #bg").animate({ opacity : 0 }, { duration: 10, easing: 'easeInOutBack',complete: function(){
			$("#east-banner #bg").css({'display':'block', 'top':'580px'});
			$("#east-banner #bg").animate({ opacity : 1 , top : 20}, { duration: 1000, easing: 'easeInOutBack' }); 
			    $("#east-banner #banner-cars").stop(true,true).animate({ opacity : 0, top : 700 }, { duration: .5, easing: 'easeInOutBack',complete: function(){
			    $("#east-banner #banner-cars").css({'display':'block', 'top':'710px'});
			    $("#east-banner #banner-cars").animate({ opacity : 1 , top : 210}, { duration: 1100, easing: 'easeInOutBack', complete: function () { console.log('complete'); }}); 
				
				     setTimeout(function (){
				     $("#east-banner #right-deal").css({ opacity: 0 });
			         $("#east-banner #right-deal").css({'display':'block', 'left':'900px'});
			         $("#east-banner #right-deal").animate({ opacity : 1 , left : 650 }, { duration: 1100, easing: 'easeInOutBack' }); 
					 },800);
				
				     setTimeout(function (){
				     $("#east-banner #left-deal").css({ opacity: 0 });
			         $("#east-banner #left-deal").css({'display':'block', 'left':'-200px'});
			         $("#east-banner #left-deal").animate({ opacity : 1 , left : 20 }, { duration: 1100, easing: 'easeInOutBack' }); 
					 },1200);
					 
					 
					 setTimeout(function (){
				     $("#east-banner .title-40").css({ opacity: 0 });
			         $("#east-banner .title-40").css({'display':'block', 'left':'-700px'});
			         $("#east-banner .title-40").animate({ opacity : 1 , left : 20 }, { duration: 1100, easing: 'easeInOutBack' }); 
					 },1100);
					 
					  setTimeout(function (){
				     $("#east-banner .sub-title-white").css({ opacity: 0 });
			         $("#east-banner .sub-title-white").css({'display':'block', 'left':'-700px'});
			         $("#east-banner .sub-title-white").animate({ opacity : 1 , left : 25 }, { duration: 1100, easing: 'easeInOutBack' }); 
					 },1400);
					 
					 setTimeout(function () {
						$("#east-banner #banner-btns").fadeIn();
			            $("#east-banner #offer-title").fadeIn();
			            $("#east-banner #legal-btn").fadeIn(); 
						$("#east-banner #no-charge-logo").fadeIn();
					 },1600);
				
			     
			     }}); 
			 }}); 
  
			 
			 

		}
		
		/* GEO BANNER ANIMATION */
		var westAnimate = function () {
			
			$("#west-banner #banner-cars").hide();
			$("#west-banner #left-deal").hide();
			$("#west-banner #right-deal").hide();
			$("#west-banner #no-charge-logo").hide();
			$("#west-banner #banner-btns").hide();
			$("#west-banner #offer-title").hide();
			$("#west-banner #legal-btn").hide();
			$("#west-banner #bg").hide();
			$("#west-banner .title-40").hide();
			$("#west-banner .sub-title-white").hide();
			
			$("#west-banner #bg").animate({ opacity : 0 }, { duration: 10, easing: 'easeInOutBack',complete: function(){
			$("#west-banner #bg").css({'display':'block', 'top':'580px'});
			$("#west-banner #bg").animate({ opacity : 1 , top : 20}, { duration: 1000, easing: 'easeInOutBack' }); 
			    $("#west-banner #banner-cars").stop(true,true).animate({ opacity : 0, top : 700 }, { duration: .5, easing: 'easeInOutBack',complete: function(){
			    $("#west-banner #banner-cars").css({'display':'block', 'top':'710px'});
			    $("#west-banner #banner-cars").animate({ opacity : 1 , top : 210}, { duration: 1100, easing: 'easeInOutBack', complete: function () { console.log('complete'); }}); 
				
				     setTimeout(function (){
				     $("#west-banner #right-deal").css({ opacity: 0 });
			         $("#west-banner #right-deal").css({'display':'block', 'left':'900px'});
			         $("#west-banner #right-deal").animate({ opacity : 1 , left : 650 }, { duration: 1100, easing: 'easeInOutBack' }); 
					 },800);
				
				     setTimeout(function (){
				     $("#west-banner #left-deal").css({ opacity: 0 });
			         $("#west-banner #left-deal").css({'display':'block', 'left':'-200px'});
			         $("#west-banner #left-deal").animate({ opacity : 1 , left : 20 }, { duration: 1100, easing: 'easeInOutBack' }); 
					 },1200);
					 
					 
					 setTimeout(function (){
				     $("#west-banner .title-40").css({ opacity: 0 });
			         $("#west-banner .title-40").css({'display':'block', 'left':'-700px'});
			         $("#west-banner .title-40").animate({ opacity : 1 , left : 20 }, { duration: 1100, easing: 'easeInOutBack' }); 
					 },1100);
					 
					  setTimeout(function (){
				     $("#west-banner .sub-title-white").css({ opacity: 0 });
			         $("#west-banner .sub-title-white").css({'display':'block', 'left':'-700px'});
			         $("#west-banner .sub-title-white").animate({ opacity : 1 , left : 25 }, { duration: 1100, easing: 'easeInOutBack' }); 
					 },1400);
					 
					 setTimeout(function () {
						$("#west-banner #banner-btns").fadeIn();
			            $("#west-banner #offer-title").fadeIn();
			            $("#west-banner #legal-btn").fadeIn(); 
						$("#west-banner #no-charge-logo").fadeIn();
					 },1600);
				
			     
			     }}); 
			 }}); 
  
			 

		}
		
		
		

		/* SLIDE 3 BANNER ANIMATION */
		var slide3Animate = function () {
			
			$("#slide-3 #jcw-logo").css({'display':'none'});
			$("#slide-3 #banner-links").css({'display':'none'});
			$("#slide-3 #slide-3-car-1").css({'display':'none'});
			$("#slide-3 #slide-3-car-2").css({'display':'none'});
			$("#slide-3 #banner-box").css({'display':'none'});
			$("#slide-3 #banner-bg").css({'display':'none'});
			
			$("#slide-3 #banner-box").stop(true,true).animate({ opacity : 0 }, { duration: 10, easing: 'easeInOutBack',complete: function(){
			$("#slide-3 #banner-box").css({'display':'block', 'left':'-380px'});
			$("#slide-3 #banner-box").stop(true,true).animate({ opacity : 1 , left : 200}, { duration: 900, easing: 'easeInOutBack' }); 
			     
			    $("#slide-3 #slide-3-car-1").animate({ opacity : 0 }, { duration: 10, easing: 'easeInOutBack',complete: function(){
					$("#slide-3 #slide-3-car-1").css({'display':'block', 'top':'-10px', 'left' : '-110'});
			        $("#slide-3 #slide-3-car-1").stop(true,true).animate({ opacity : 1 , top : 10, left : -120}, { duration: 900, easing: 'easeInOutBack' }); 
					 
					 
					 $("#slide-3 #slide-3-car-2").stop(true,true).animate({ opacity : 0 }, { duration: 10, easing: 'easeInOutBack',complete: function(){
					 setTimeout(function () {
					 $("#slide-3 #slide-3-car-2").css({'display':'block', 'top':'-20px', 'left' : '150'});
			         $("#slide-3 #slide-3-car-2").stop(true,true).animate({ opacity : 1 , top : 0, left : 115}, { duration: 900, easing: 'easeInOutBack' }); 
					 }, 300);
					 
					 $("#slide-3 #banner-bg").stop(true,true).animate({ opacity : 0 }, { duration: 10, easing: 'easeInOutBack'});
					 setTimeout(function () {
					 $("#slide-3 #banner-bg").css({'display':'block'});
			         $("#slide-3 #banner-bg").stop(true,true).animate({ opacity : 1  }, { duration: 1200, easing: 'easeInOutBack' }); 
					 },900);
					 
					 
					 $("#slide-3 #jcw-logo").stop(true,true).animate({ opacity : 0 }, { duration: 10, easing: 'easeInOutBack'});
					 setTimeout(function () {
					 $("#slide-3 #jcw-logo").css({'display':'block', 'left':'500px'});
			         $("#slide-3 #jcw-logo").stop(true,true).animate({ opacity : 1 , left : 978 }, { duration: 1200, easing: 'easeInOutBack' }); 
					 },1500);
					 
					 
					 $("#slide-3 #banner-links").stop(true,true).animate({ opacity : 0 }, { duration: 10, easing: 'easeInOutBack'});
					 setTimeout(function () {
					 $("#slide-3 #banner-links").css({'display':'block', 'left':'500px'});
			         $("#slide-3 #banner-links").stop(true,true).animate({ opacity : 1 , left : 230 }, { duration: 1200, easing: 'easeInOutBack' }); 
					 },1300);
					 
					 
				
				     }}); //end 3 
				
				
				}}); // end 2
				
				
				
			
			 }}); // end 1 
			
			
		}
		
		
		/* BANNER 2 ANIMATIONS */
		var carCount = 0;
		var carTimer;
		var startBanner2 = function () {
		$("#car-1,#car-2,#car-3,#car-4,#car-5,#box-image,#banner-top-title,#banner-top-logo,#banner-top-learn-more").css({'display':'none'});
			carTimer = setTimeout( drawCar, 10 );
		}
		var drawCar = function () {
			clearTimeout(carTimer);
			
			if( carCount <= 5 ){
			carCount++;
			var car = "#car-"+carCount;
			$(car).animate({ opacity : 0 }, { duration: 100, easing: 'easeInOutBack',complete: function(){
			$(car).css({'display':'block', 'left':'30px', 'top':'-5px'});
			$(car).animate({ opacity : 1 , left : 0, top : 0}, { duration: 900, easing: 'easeInOutBack' }); 
			
			 }}); 
			 carTimer = setTimeout( drawCar, 200 );
			}else{
				carCount = 0;
				clearTimeout(carTimer);
				openBox();
			}
			 
			 
		}
		var openBox = function(){
			$("#box-image").animate({ opacity : 0 }, { duration: 10, easing: 'easeInOutBack',complete: function(){
			$("#box-image").css({'display':'block', 'left':'0px', 'top':'289px'});
			$("#box-image").animate({ opacity : 1 , left : 0, top : 0}, { duration: 900, easing: 'easeInOutBack' }); 
			   openBannerCopy();
			 }}); 
			
		}
		
		
		var openBannerCopy = function(){
			$("#banner-top-title").animate({ opacity : 0 }, { duration: 10, easing: 'easeInOutBack',complete: function(){
			$("#banner-top-title").css({'display':'block', 'left' : '600px'});
			$("#banner-top-title").animate({ opacity : 1 , left : 300 }, { duration: 1500, easing: 'easeInOutBack' }); }}); 
			
			$("#banner-top-logo").animate({ opacity : 0 }, { duration: 10, easing: 'easeInOutBack',complete: function(){
			$("#banner-top-logo").css({'display':'block', 'left' : '600px'});
			$("#banner-top-logo").animate({ opacity : 1 , left : 970}, { duration: 1800, easing: 'easeInOutBack' }); }}); 
			
			$("#banner-top-learn-more").animate({ opacity : 0 }, { duration: 10, easing: 'easeInOutBack',complete: function(){
			$("#banner-top-learn-more").css({'display':'block', 'left' : '100px'});
			$("#banner-top-learn-more").animate({ opacity : 1, left : 270 }, { duration: 2000, easing: 'easeInOutBack' }); }});
			
		}
		
		
		
		
		/* SLIDE 4  BANNER ANIMATION */
		var slide4Animate = function () {
			
			$("#gp-logo").css({'display':'none'});
			$("#find-out-more").css({'display':'none'});
			$("#s4-car-top").css({'display':'none'});
			$("#banner-box-s4").css({'display':'none'});
			$("#banner-bg-s4").css({'display':'none'});
			
			$("#find-out-more").animate({ opacity : 0 }, { duration: 10, easing: 'easeInOutBack'});
		    setTimeout(function () {	 
			$("#find-out-more").css({'display':'block', 'left' : '0px'});
		    $("#find-out-more").animate({ opacity : 1, left : 985 }, { duration: 1200, easing: 'easeInOutBack' }); 
		    }, 300);
			
			$("#banner-bg-s4").animate({ opacity : 0 }, { duration: 10, easing: 'easeInOutBack'});
		    setTimeout(function () {	 
			$("#banner-bg-s4").css({'display':'block'});
		    $("#banner-bg-s4").animate({ opacity : 1 }, { duration: 1200, easing: 'easeInOutBack' }); 
		    }, 300);
			
			$("#s4-car-top").animate({ opacity : 0 }, { duration: 10, easing: 'easeInOutBack',complete: function(){
			$("#s4-car-top").css({'display':'block', 'left':'-500px'});
			$("#s4-car-top").animate({ opacity : 1 , left : 111}, { duration: 900, easing: 'easeInOutBack' }); 
			}}); 
				  
			setTimeout(function () {	 
			$("#banner-box-s4").animate({ opacity : 0 }, { duration: 10, easing: 'easeInOutBack',complete: function(){
			$("#banner-box-s4").css({'display':'block', 'left':'1100px'});
			$("#banner-box-s4").animate({ opacity : 1 , left : 538}, { duration: 900, easing: 'easeInOutBack' }); 	 
			 }}); 
			 
			},700);

		}
		
		
		
		
		
		/* SLIDE 5 BANNER ANIMATION */
		var slide5Animate = function () {
			
			$("#slide-5").fadeIn();
			
			$("#find-more").hide();
			$("#box-border").hide();
			$("#ray-title").hide();
			$("#ray-img").hide();
			$("#ray-car").hide();
			
			setTimeout(function () {	 
			$("#box-border").animate({ opacity : 0 }, { duration: 10, easing: 'easeInOutBack',complete: function(){
			$("#box-border").css({'display':'block', 'left':'-100px'});
			$("#box-border").animate({ opacity : 1 , left : 228}, { duration: 900, easing: 'easeInOutBack' }); 	 
			 }}); 
			 
			},300);
			
			setTimeout(function () {	 
			$("#ray-title").animate({ opacity : 0 }, { duration: 10, easing: 'easeInOutBack',complete: function(){
			$("#ray-title").css({'display':'block', 'left':'348px'});
			$("#ray-title").animate({ opacity : 1 , left : 248}, { duration: 900, easing: 'easeInOutBack' }); 	 
			 }}); 
			 
			},500);
			
			setTimeout(function () {	 
			$("#ray-img").animate({ opacity : 0 }, { duration: 10, easing: 'easeInOutBack',complete: function(){
			$("#ray-img").css({'display':'block'});
			$("#ray-img").animate({ opacity : 1 }, { duration: 900, easing: 'easeInOutBack' }); 	 
			 }}); 
			 
			},800);
			
			setTimeout(function () {	 
			$("#ray-car").animate({ opacity : 0 }, { duration: 10, easing: 'easeInOutBack',complete: function(){
			$("#ray-car").css({'display':'block', 'left':'648px'});
			$("#ray-car").animate({ opacity : 1 , left : 540}, { duration: 900, easing: 'easeInOutBack' }); 	 
			 }}); 
			},1100);
			
			setTimeout(function () {	 
			$("#find-more").animate({ opacity : 0 }, { duration: 10, easing: 'easeInOutBack',complete: function(){
			$("#find-more").css({'display':'block', 'left':'-648px'});
			$("#find-more").animate({ opacity : 1 , left : 240}, { duration: 900, easing: 'easeInOutBack' }); 	 
			 }}); 
			},1500);
			
			
			
		}
		
		
		/* SLIDE 6 BANNER ANIMATION */
		var slide6Animate = function () {
			
			$("#slide-6").fadeIn();
			
			$("#not-normal-logo").hide();
			$("#not-normal-bg").hide();
			$("#nn-callout").hide();
			
			setTimeout(function () {	 
			$("#not-normal-bg").animate({ opacity : 0 }, { duration: 1, easing: 'easeInOutBack',complete: function(){
			$("#not-normal-bg").css({'display':'block'});
			$("#not-normal-bg").animate({ opacity : 1 }, { duration: 900, easing: 'easeInOutBack' }); 	 
			 }}); 
			 
			},300);
			
			setTimeout(function () {	 
			$("#not-normal-logo").animate({ opacity : 0 }, { duration: 1, easing: 'easeInOutBack',complete: function(){
			$("#not-normal-logo").css({'display':'block', 'left':'-350px'});
			$("#not-normal-logo").animate({ opacity : 1 , 'left' :'185px' }, { duration: 900, easing: 'easeInOutBack' }); 	 
			 }}); 
			 
			},500);
			
			
			setTimeout(function () {	 
			$("#nn-callout").animate({ opacity : 0 }, { duration: 1, easing: 'easeInOutBack',complete: function(){
			$("#nn-callout").css({'display':'block', 'left':'-350px'});
			$("#nn-callout").animate({ opacity : 1 , 'left' :'197px' }, { duration: 900, easing: 'easeInOutBack' }); 	 
			 }}); 
			 
			},800);
			
		}
		
		
		
		/* NO GEO BANNER ANIMATION */
		var noGeoAnimate = function () {
			
			$("#hiber-event").css({'display':'none'});
			$("#banner-links-no-geo").css({'display':'none'});
			$("#geo-car-1").css({'display':'none'});
			$("#geo-car-2").css({'display':'none'});
			$("#banner-box-no-geo").css({'display':'none'});
			
			$("#banner-box-no-geo").animate({ opacity : 0 }, { duration: 10, easing: 'easeInOutBack'});
		    setTimeout(function () {	 
			$("#banner-box-no-geo").css({'display':'block', 'left' : '-200px'});
		    $("#banner-box-no-geo").animate({ opacity : 1, left : 200 }, { duration: 1200, easing: 'easeInOutBack' }); 
		    }, 500);
			
			$("#hiber-event").animate({ opacity : 0 }, { duration: 10, easing: 'easeInOutBack'});
		    setTimeout(function () {	 
			$("#hiber-event").css({'display':'block', 'left' : '1200px'});
		    $("#hiber-event").animate({ opacity : 1, left : 890 }, { duration: 1200, easing: 'easeInOutBack' }); 
		    }, 600);
			
			$("#geo-car-2").animate({ opacity : 0 }, { duration: 10, easing: 'easeInOutBack'});
		    setTimeout(function () {	 
			$("#geo-car-2").css({'display':'block', 'top':'-30px'});
		    $("#geo-car-2").animate({ opacity : 1, top : 0 }, { duration: 1200, easing: 'easeInOutBack' }); 
		    }, 200);
			
			$("#geo-car-1").animate({ opacity : 0 }, { duration: 10, easing: 'easeInOutBack',complete: function(){
			$("#geo-car-1").css({'display':'block', 'top':'-20px'});
			$("#geo-car-1").animate({ opacity : 1 , top : 0}, { duration: 900, easing: 'easeInOutBack' }); 
			}}); 
				  
			setTimeout(function () {	 
			$("#banner-links-no-geo").animate({ opacity : 0 }, { duration: 10, easing: 'easeInOutBack',complete: function(){
			$("#banner-links-no-geo").css({'display':'block', 'left':'-1100px'});
			$("#banner-links-no-geo").animate({ opacity : 1 , left : 232}, { duration: 900, easing: 'easeInOutBack' }); 	 
			 }}); 
			},700);

		}
		
		
		
		
		
	
   
		return{ init : init, centralAnimate : centralAnimate, eastAnimate : eastAnimate, noGeoAnimate : noGeoAnimate, bannerCount : bannerCount, switchBanner : switchBanner, reset : reset };
		
		
    })();

	return { Rotator : Rotator };
	
}(jQuery, window._banner = window._banner || {}, window, document));