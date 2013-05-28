/*
 * Rob Thiessen
 * -----------------
 * MINI HOME PAGE DATA
 * ENGLISH VERSION
 * Richmondday Jan - 2013
 * jslint browser: true, maxerr: 50, indent: 4, devel: true, white:true;
 *//*!
 * @dependency jquery-1.7.2.min.js 
 * @dependency jquery.waitforimages.js
 *
 * API DATA UTILITY
 * HANDLES LOADING EXTERNAL DATA
 *
 */
 
;(function ($, api, window, document, undefined ){
	
	'use strict'; 
	
	var Api = api.Api = api.Api || ( function () {
		
		var CARS = [];
		var MODELS = [];
		var FAMILYNAME = [];
		var familyNames = [];
		var carLinks = [];
		var currentRolled = '';
		var navPositions = [-100,-80,-50,0,50,60,60,60,60];
		
		var miniURLs = [
		{car : '2013 MINI Cooper', url : '/fr/mini/cooper/index.html'},
		{car : '2013 MINI Cooper S', url : '/fr/mini/cooper_s/index.html'},
		{car : '2013 MINI John Cooper Works', url:'/fr/mini/john_cooper_works/index.html'},
		{car : '2013 MINI Cooper Coupé', url : '/fr/mini_coupe/cooper/index.html'},
		{car : '2013 MINI Cooper S Coupé', url : '/fr/mini_coupe/cooper_s/index.html'},
		{car : '2013 MINI John Cooper Works Coupé' , url : '/fr/mini_coupe/john_cooper_works/index.html'},
		{car : '2013 MINI Cooper Convertible', url : '/fr/mini_convertible/cooper/index.html'},
		{car : '2013 MINI Cooper S Convertible' , url : '/fr/mini_convertible/cooper_s/index.html'},
		{car : '2013 MINI John Cooper Works Convertible' , url : '/fr/mini_convertible/john_cooper_works/index.html'},
		{car : '2013 MINI Cooper Roadster' , url: '/fr/mini_roadster/cooper/index.html'},
		{car : '2013 MINI Cooper S Roadster' , url : '/fr/mini_roadster/cooper_s/index.html'},
		{car : '2013 MINI John Cooper Works Roadster' , url : '/fr/mini_roadster/john_cooper_works/index.html'},
		{car : '2013 MINI Cooper Clubman', url : '/fr/mini_clubman/cooper/index.html'},
		{car : '2013 MINI Cooper S Clubman' , url : '/fr/mini_clubman/cooper_s/index.html'},
		{car : '2013 MINI John Cooper Works Clubman', url : '/fr/mini_clubman/john_cooper_works/index.html'},
		{car : '2013 MINI Cooper Countryman', url : '/fr/mini_countryman/cooper/index.html'},
		{car : '2013 MINI Cooper S Countryman ALL4' , url : '/fr/mini_countryman/cooper_s/index.html'},
		{car : '2013 MINI Cooper S Countryman ALL4' , url: '/fr/mini_countryman/cooper_s_all4/index.html'},
		{car : '2013 MINI Cooper Clubman Green Park', url : '/fr/mini_clubman/cooper/index.html'},
		{car : '2013 MINI Cooper Clubman Hyde Park', url : '/fr/mini_clubman/cooper/index.html'},
		{car : '2013 MINI Cooper S Clubman Green Park', url : '/fr/mini_clubman/cooper/index.html'},
		{car : '2013 MINI Cooper S Clubman Hyde Park', url : '/fr/mini_clubman/cooper/index.html'},
		{car : '2013 MINI Knightsbridge', url : '/fr/mini_design_models/mini_knightsbridge/index.html'},
		{car : '2013 MINI Baker Street', url: '/fr/mini_design_models/mini_baker_street/index.html'},
		{car : '2013 MINI Bayswater', url : '/fr/mini_design_models/mini_bayswater/index.html'},
		{car : '2013 MINI Highgate', url: '/fr/mini_design_models/mini_cabrio_highgate/index.html'},
		{car : '2013 MINI Cooper Paceman', url : '/fr/mini_paceman/cooper/information/index.html'},
		{car : '2013 MINI Cooper S Paceman All4', url:'/fr/mini_paceman/cooper_s/information/index.html'},
		{car : '2013 MINI Cooper Convertible Knightsbridge', url : '/fr/mini_design_models/mini_knightsbridge/index.html'},
		{car : '2013 MINI John Cooper Works Countryman ALL4', url : '/fr/mini_countryman/john_cooper_works_countryman/index.html'},
		{car : '2013 MINI John Cooper Works Paceman ALL4', url : '/fr/mini_paceman/john_cooper_works/information/index.html'},
		{car : '2013 MINI John Cooper Works GP', url : '/fr/mini/john_cooper_works_gp/index.html'}
		
		];
		
		
		var modelURLs = [
		{car : '2013 MINI Cooper', url : 'http://www.mini.ca/fr/mini/'},
		{car : '2013 MINI Cooper Coupé', url : 'http://www.mini.ca/fr/mini_coupe/index.html'},
		{car : '2013 MINI Cooper Convertible', url : 'http://www.mini.ca/fr/mini_convertible/index.html'},
		{car : '2013 MINI Cooper Roadster', url : 'http://www.mini.ca/fr/mini_roadster/index.html  '},
		{car : '2013 MINI Cooper Clubman', url : 'http://www.mini.ca/fr/mini_clubman/index.html'},
		{car : '2013 MINI Cooper Countryman', url : 'http://www.mini.ca/fr/mini_countryman/index.html'},
		{car : '2013 MINI John Cooper Works', url : 'http://www.mini.ca/frmini/john_cooper_works/index.html'},
		{car : '2013 MINI Cooper Paceman', url : 'http://www.mini.ca/fr/mini_paceman/index.html'},
		{car : 'MINI SPECIAL EDITIONS', url : 'http://www.mini.ca/fr/mini_design_models/'}
		];
		
		
		
		// -- INITIALIZE ALL CAR DATA -- // 
		var init = function () { getCarData(); loadLocalDB(); }
		
		
		var getCarData = function () {
			
				
		$("#go-config-banner").on('click',function () {
			dcsMultiTrack( 'DCS.dcsuri', ' /fr/Selected_/Special_Offers/','WT.cg_n', 'PS:New Cars:Model:R61', 'WT.dl', '0');
		});
			
			// get one car -- 1307, 1305, 1312 
		$.support.cors = true; 
		$.ajaxSetup({ cache: false });
		$.ajax({
		type: "GET",
        url: 'http://api.buildmymini.ca/v1/fr/vehicles/?appid=NjY2NjY2NjY2Ng==',    
        dataType:($.browser.msie) ? "text" : "json", 
		cache : false,
		ifModified : true,
		crossDomain: true, 
		accepts: {
        json: "text/json",
        text: "text/json"
        },
        success: function(data){ dataRecieved(data) },  
        error: function (xhr, errorString, exception) { loadLocalDB(); }   
        });
		
		}
		
		
		var loadLocalDB = function () {
	    var localData = _vehicle.API.data;  
			dataRecieved(localData);
		}
			
		// RECIEVED THE DATA -- Do Stuff
		var dataRecieved = function (data) { CARS = data; getNavData (); }
		 
		var getNavData = function () {
			
			
		 //reset some vars 
		 MODELS = [];
		 FAMILYNAME = [];
		 $("#navTitleHolder").html('');
		 $("#nav").html('');
		 
		 
		 
		 Array.prototype.swapItems = function(a, b){
         this[a] = this.splice(b, 1, this[a])[0];
         return this;
         }
			
		 for(var i = 0; i < CARS.length; i++){
		 MODELS.push(CARS[i].ModelFamily.Ecode);
		 FAMILYNAME.push(CARS[i].ModelFamily.Name);
		 //console.log(CARS[i].ModelFamily.Name + " :: " + CARS[i].CACode);
	    }
	
		var modelsTrimmed = eliminateDuplicates(MODELS);
		var nameTrimmed = eliminateDuplicates(FAMILYNAME);
		
		// swap jcw and paceman
		FAMILYNAME.swapItems(6, 7);
		modelsTrimmed.swapItems(6, 7);
		
		
		for(var ii = 0; ii < modelsTrimmed.length; ii++ ){
	
		var thumb =  "http://buildmymini.ca/Public/i/v/" + modelsTrimmed[ii]+ "/model-selector-icon.png";
		var newThumb = '<div id="small-car-thumb"><div name="arrow" class="nav-arrow"><img src="images/hover-arrow.png" data-item="0" data-name="'+FAMILYNAME[ii]+'" alt="hardtop" /></div><div name="cover" class="car-cover"><img src="images/car-cover.png" data-item="0" data-name="'+FAMILYNAME[ii]+'" alt="hardtop" /></div><img src="'+thumb+'" data-item="0" data-name="'+FAMILYNAME[ii]+'" alt="hardtop" /></div>';
		var s = FAMILYNAME[ii].split('MINI');
		var names = '';
		if( ii > 0 ){names = '<div id="nav-title">'+s[1]+'</div>';
		}else{names = '<div id="nav-title">'+FAMILYNAME[ii]+'</div>';}
		
		if(FAMILYNAME[ii] == 'John Cooper Works'){names = '<div id="nav-title">JCW</div>';}
		$("#navTitleHolder").append(names);
		$("#nav").append(newThumb);
		
		}
	     
		// SET UP ALL CAR EVENTS 
		setUpEvents();
		
		}
		
		
		
	
	var setUpEvents = function(){
	 
	  $("#nav #small-car-thumb img").hover( function(){
		var n = $(this).data('name');
		
		
		if($('.car-cover').is(":visible")){
		}else{
			$('.car-cover').show();
		}
	
		$('.nav-arrow').hide();
		var arrow = $(this).parent().find('.nav-arrow');
		$(arrow).show();
		
		if( $(this).parent().attr('name') == 'cover'){
			$('.car-cover').show();
			$(this).parent().hide();
		}
		
		 $(".nav-arrow").hover( function(){
			 $(this).show();
		 });
		
		if( currentRolled != n ){
		getCarTypeData( n );
		}
		currentRolled = n;
       });
	   
	  $("#modal").hover( function () {
		   $("#sub-nav-box").hide();
			$("#modal").fadeOut();
			  currentRolled = '';
			$('.car-cover').hide();
			$('.nav-arrow').hide();
		   
	   });
	   
	}	
		
	var getCarTypeData = function ( type ) {
			
			//$("#sub-nav-box").animate({ top : '100px' }, { duration: 1, easing: 'easeInOutBack' });
			$("#sub-nav-box").show();
			$("#modal").fadeIn();
			
			 familyNames = [];
			 
			  for(var i = 0; i < CARS.length; i ++ ){
			  if( CARS[i].ModelFamily.Name == type ){familyNames.push(CARS[i].Name);  }
			  }
			  
			 handleSelectedData(familyNames[0]); 
			  var fName = familyNames[0];
			  
			 
			 if(fName == '2013 MINI Cooper Cabriolet Knightsbridge'){
				 fName = 'MINI SPECIAL EDITIONS';
			 }
		
			var str = '<div id="car-title" class="title17"><a href="#">'+fName+'</a>';
			str+='</div><div id="type-title" class="title15"><a href="#">INDEX</a></div><br/>';
			str+='</div><div id="type-title" class="title12"><a href="#">'+familyNames[0]+'</a></div><br/>';
			str+='</div><div id="type-title" class="title12"><a href="#">'+familyNames[1]+'</a></div><br/>';
			if(typeof familyNames[2] != 'undefined' ){str+='</div><div id="type-title" class="title12"><a href="#">'+familyNames[2]+'</a></div><br/>';};
			if(typeof familyNames[3] != 'undefined' ){str+='</div><div id="type-title" class="title12"><a href="#">'+familyNames[3]+'</a></div><br/>';};
			if(typeof familyNames[4] != 'undefined' ){str+='</div><div id="type-title" class="title12"><a href="#">'+familyNames[4]+'</a></div><br/>';};
			if(typeof familyNames[5] != 'undefined' ){str+='</div><div id="type-title" class="title12"><a href="#">'+familyNames[5]+'</a></div><br/>';};
			if(typeof familyNames[6] != 'undefined' ){str+='</div><div id="type-title" class="title12"><a href="#">'+familyNames[6]+'</a></div><br/>';};
			if(typeof familyNames[7] != 'undefined' ){str+='</div><div id="type-title" class="title12"><a href="#">'+familyNames[7]+'</a></div><br/>';};
			
			$("#sub-nav-box #left-side").html('');
			$("#sub-nav-box #left-side").html(str);
			
			
			$(".title12").on('mouseover', function (e){
				e.preventDefault();
				if( currentRolled != $(this).text() ){
		         handleSelectedData( $(this).text() );
		        }
				currentRolled = $(this).text();
			});  
			
			
			$(".title12").on('click', function (e){
				e.preventDefault();
				var tar = $(this).text();
				var miniLink = '';
				//console.log( tar );
					for( var n = 0; n < miniURLs.length; n++){
						
						if( miniURLs[ n ].car == tar ){
						    miniLink = 'http://www.mini.ca'+miniURLs[n].url;
							dcsMultiTrack( 'DCS.dcsuri', ' /fr/Selected_/'+miniURLs[ n ].car+'/','WT.cg_n', 'PS:New Cars:Model:R61', 'WT.dl', '0');
							//console.log( "URL  :: " + miniLink );
							window.open(miniLink  , '_parent');
						}	
					}
			});  
			
			
			$(".title17").on('click', function (e){
				e.preventDefault();
				var tar = $(this).text();
				var miniLink = '';
					for( var n = 0; n < modelURLs.length; n++){
						if( modelURLs[ n ].car == tar ){
						    miniLink = modelURLs[n].url;
							 dcsMultiTrack( 'DCS.dcsuri', ' /fr/Selected_/'+modelURLs[ n ].car+'/','WT.cg_n', 'PS:New Cars:Model:R61', 'WT.dl', '0');
							//console.log( "URL  :: " + miniLink );
							window.open(miniLink  , '_parent');
						}	
					}
			});  
			
			
			
			// OVERVIEW BUTTON 
			$(".title15").on('click', function (e){
				e.preventDefault();
				var tar = familyNames[0];
				var miniLink = '';
				
				if( tar == '2013 MINI Cooper Cabriolet Knightsbridge' ){
					miniLink = 'http://www.mini.ca/en/mini_design_models/index.html';
					window.open(miniLink  , '_parent');
				}
				
				for( var n = 0; n < modelURLs.length; n++){
					if( modelURLs[ n ].car == $.trim(tar) ){
					    miniLink = modelURLs[n].url;
						dcsMultiTrack( 'DCS.dcsuri', ' /Selected_/'+modelURLs[ n ].car+'/','WT.cg_n', 'PS:New Cars:Model:R61', 'WT.dl', '0');
						window.open(miniLink  , '_parent');
						}	
					}
			});
			
			
			
	}	
	
	
	var handleSelectedData = function ( name ) {
			
			var url = 'http://www.mini.ca/en/mini/cooper/index.html';
			
			var bURL = '';
			
			for( var i = 0; i < CARS.length; i++ ){
				
				if( name == CARS[i].Name ){
					
					$("#sub-nav-box").stop(true, true).animate({ left : navPositions[i] }, { duration: 200, easing: 'easeInOutCubic' }); 
					
					if(name == 'MINI Cooper S Coupé'){
				    name = 'MINI Cooper S Coupe';
			        } else if(name == 'MINI Cooper Coupé'){
				    name = 'MINI Cooper Coupe';
			        }else if(name == 'MINI John Cooper Works Coupé'){
				    name = 'MINI John Cooper Works Coupe';
			        }

					
					bURL = 'http://buildmymini.ca/#/' + CARS[i].ModelFamily.ModelSlug +'/'+ CARS[i].UrlSlug + '/colours';
					var miniLink = '';
					for( var n = 0; n < miniURLs.length; n++){
						if( miniURLs[ n ].car == name ){
						    miniLink = 'http://www.mini.ca'+miniURLs[n].url;
						
						}	
					}
					
	
					var str = 'Puissance: ' + CARS[i].VehicleSpecsComplete.Output +'<br/> Accélération: ' +CARS[i].VehicleSpecsComplete.Acceleration+ '<br/> Limitée électroniquement: ' +CARS[i].VehicleSpecsComplete.TopSpeed + '<br/> Consommation de carburant: ' + CARS[i].VehicleSpecsComplete.FuelConsumptionCombined +'</div>';
					var n = $.trim(name);
					var book = "Convenez D'un Essai";
					
					var url = '';
					if( n == '2013 MINI Cooper S Clubman Hyde Park' || n == '2013 MINI Cooper Clubman Green Park' ||  n == '2013 MINI Cooper Clubman Hyde Park' || n == '2013 MINI Cooper S Clubman Green Park' ){
					url = '<div id="type-title" class="title12-nav"><a href="https://ssl.mini.ca/en/contact/test_drive/index.html?model=ZC31&body_type=GF" target="_parent"><div id="btn-arrow" ><img src="images/btn-arrow.jpg" border="0" /></div>'+book+'</a></div>';
					}else{
					 url = '<div id="type-title" class="title12-nav"><a href="'+miniLink+'" target="_parent"><div id="btn-arrow" ><img src="images/btn-arrow.jpg" border="0"/></div>EN SAVOIR PLUS SUR CE MODELE</a></div><br><div id="type-title" class="title12-nav"><a href="'+bURL+'" target="_blank"><div id="btn-arrow"><img src="images/btn-arrow.jpg" border="0"/></div>CONSTRUISEZ VOTRE MINI</a></div><br><div id="type-title" class="title12-nav"><a href="https://ssl.mini.ca/en/contact/test_drive/index.html?model=ZC31&body_type=GF" target="_parent"><div id="btn-arrow" ><img src="images/btn-arrow.jpg" border="0" /></div>'+book+'</a></div>';
					 
					}
					
					$("#car-desc").html( CARS[i].IntroBlurb );
					$("#car-options").html(''); 
				
					$("#car-options").html(str);
					
					$("#car-urls").html(''); 
					$("#car-urls").html(url);
				
					$("#right-side #car-title").html( CARS[i].Name );
					var mainImage = "http://buildmymini.ca/Public/i/v/"+ CARS[i].ModelFamily.Ecode + "/"+ CARS[i].CACode + "/colours/" + CARS[i].BodyColours[0].Code+'.png';
					var img = '<img src="'+mainImage+'" />';
			        $("#loaded-images").append( img );
					$('#loaded-images').waitForImages(function() { $("#car-img").html( img ); });
					
					
				}
			}
		}
	
		
     // CHECK FOR DUPLICATES IN THE ARRAY 		
	function eliminateDuplicates(arr) { var i, len=arr.length, out=[], obj={};
    for (i=0;i<len;i++) { obj[arr[i]]=0; } for (i in obj) { out.push(i);}  return out;}
		
	return{ init : init  };
		
	}());

	return{ Api : Api  }
	
}(jQuery, window._api = window._api || {}, window, document ));