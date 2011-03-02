/**
 * JavaScript created for Fiona Barratt Interiors
 * Created by Stuart Basden stu@t.apio.ca 2011
 * Released as Open Source under MIT license
 * 
**/



(function( $ ){
  $.fn.navigate = function( options ) {
		
		var settings = {
			'mainCycle' : {
				fx:'blindX',
				timeout:0
			},
			'subCycle'  : {
				fx:'blindY'
			}
		};


		return this.each(function() {        
			// If options exist, lets merge them
			// with our default settings
			if ( options ) { 
				$.extend( settings, options );
			}
			
			var selector = $(this);
			
			var pageSlideNos = {};
			var i = 0;
			
			// Get the pages 
			$(this).children().each(function() {
				var id = $(this).attr('id');
				//console.log(id); // Will log all pages IDs
				pageSlideNos[id] = i;
				i++;
				
				$(this).addClass('page');
			});
			//console.log(pageSlideNos); // Will log the JSON
			
			// Show the initial slide (change to entry hash)
			window.location.hash = "#Home";
			// CHANGE!!!
			
			
			// Start cycling the main pages
			$(this).cycle(settings['mainCycle']);
			
			$('a').click(['selector','pageSlideNos'],function() {
				
				if ($(this).attr('href').charAt(0) == '#') {
					
					// Set variables
					var link = $(this).attr('href');
					
					// Begin main menu a
					oldPage = window.location.hash.toLowerCase();
					newPage = $(this).attr('href').toLowerCase();
					oldSubPage = '', newSubPage = '';
					
					if (oldPage == newPage) {return false;}
					//console.log(oldPage, newPage);
					
					//*
					if (oldPage.indexOf('/') !=-1) {
						var hashArray = oldPage.split('/');
						oldPage = hashArray[0];
						oldSubPage = hashArray[1];
						//console.log(oldPage, oldSubPage);
					}
					if (newPage.indexOf('/') !=-1) {					
						var hashArray = newPage.split('/');
						newPage = hashArray[0];
						newSubPage = hashArray[1];
						//console.log(newPage, newSubPage);
					}//*/
					
					if (oldSubPage == '' && newSubPage == '') {
					// Going from main page to main page (#home -> #about)
						console.log('main page to main page');
						
						mainToMain(selector, pageSlideNos, oldPage, newPage);
						
					} else if (oldSubPage == '' && newSubPage != '') {
					// Going from main page to sub page(#home-> #gallery/page2 and #gallery-> #gallery/page2)
						console.log('main page to sub page');
						
						mainToSub(selector, pageSlideNos, oldPage, newPage, newSubPage);
						
					} else if (oldSubPage != '' && newSubPage != '') {
					// Going from sub page to sub page (#gallery/page2 -> #gallery/page3)
						console.log('sub page to sub page');
						
						subToSub(selector, pageSlideNos, oldSubPage, newSubPage);
						
					} else if (oldSubPage != '' && newSubPage == '') {
					// Going from sub page to main page (#gallery/page2 -> #gallery and #gallery/page2 -> #home)
						console.log('sub page to main page');
						
						subToMain(selector, pageSlideNos, oldPage, oldSubPage, newPage)
						
					}
					
					
					
					
					// Set the new location
					var hash = '#' + link.charAt(1).toUpperCase() + link.slice(2);
					window.location.hash = hash;
					return false;
				} else {
					// It's a link to another page, so
					return true;
				}
			});

		});

  };
})( jQuery );




function mainToMain(selector, pageSlideNos, oldPage, newPage) {
	var slide = pageSlideNos[newPage.replace('#','')];
	//console.log(slide);
	selector.cycle(slide);
}


























/******************
* Main Navigation *
******************/

function hidePage(oldPage, newPage, subPage) {
	$('.active').removeClass('active');
	if (oldPage == '#home') {
		$('#logo').delay(900).animate({'left':'44px'},600, 'easeOutExpo');
		$('#logo2').animate({'left':'-823px'},600, 'easeOutExpo');
	}
	
	$(oldPage + ' .submenu').delay(300).animate({'left':'-150px'},'slow');
	
	if (subPage === '') {
		subPage = oldPage + ' .mainContentPanel';
		revertSubPage = 1;
	} else {
		subPage = '.contentPanel';
		revertSubPage = 0;
	}
	//console.log(subPage);
	$(subPage).animate({'left':'-800px'},'slow', function() {
		$(oldPage).hide();
		if (revertSubPage == 1) {subPage = '';}
		showMainPage(newPage, subPage);
	});
}



function showMainPage(newPage, subPage) {
	// Add .active to menu
	var newHref = newPage.charAt(1).toUpperCase() + newPage.slice(2);
	$('#menu a[href=#'+newHref+']').addClass('active');
	
	// Animate logo and menu opacity
	if (newPage == '#home') {
		$('#mainBG').animate({'opacity':'0.7'});
		$('#logo').animate({'left':'-184px'},600, 'easeOutExpo');
		$('#logo2').delay(1000).animate({'left':'155px'},600, 'easeOutExpo');
	} else {
		$('#mainBG').animate({'opacity':'1'});
	}
	
	// Show new page and subpage
	$(newPage).show(0,function() {
		$(newPage + ' .submenu').delay(600).animate({'left':'368px'});
		if (subPage === '') {subPage = newPage + ' .mainContentPanel';}
		showSubPage(subPage);
	});
}

/******************
* Sub  Navigation *
******************/



function hideSubPage(oldPage, newPage) {
	$('.activeSub').removeClass('activeSub');
	$(oldPage).animate({'left':'-800px'},400, function() {
		if(newPage) {showSubPage(newPage);}
	});
}

function showSubPage(newSubPage) {
	// Add .subActive to menu
	var newHref = newSubPage.charAt(1).toUpperCase() + newSubPage.slice(2);
	$('.submenu a[href="#Projects/'+newHref+'"]').addClass('activeSub');
	
	// Cycle background
	var bgSlide = {
		'none':0,
		'profile':1,
		'projects':2,
		'no14':3,
		'thelodge':4,
		'apartmentchelsea':5,
		'townhousechelsea':6,
		'kensington':7,
		'stjohnswood':8,
		'swlondon':9,
		'current':10,
		'services':11,
		'contact':12
	};
	var slide = newSubPage.replace('#','');
	if (newSubPage.indexOf('mainContentPanel') !=-1) {
		var whichMain = newSubPage.replace('#','').replace(' .mainContentPanel','');
		slide=whichMain;
		if (bgSlide[slide] == undefined) {slide='none';}
	}
	if (bgSlide[slide] == undefined) {slide='current';}
	var newBG = bgSlide[slide];
	//console.log(slide);
	//$('#backgrounds').cycle(newBG);
	
	$(newSubPage).delay(400).animate({'left':'368px'});
}
//*/







