$(docuemnt).ready(function() {
	
	// Set vars
	if (!window.location.hash) {window.location.hash = "#Home"} // If nowhere, go home
	var hash = window.location.hash.toLowerCase();
	var activePage = hash, newPage = "", subPage = "", hashArr = [], showIsActive = false;


	
	// Initial page load
	if (hash != '#home') {
		$('#logo').delay(900).animate({'left':'44px'},600, 'easeOutExpo');
	}
	$('.page').hide();
	if (hash.indexOf('/') !=-1) {
		hashArr = hash.split('/');
		newPage = hashArr[0];
		subPage = '#'+hashArr[1];
	} else {
		newPage = hash;
	}
	
	
	// Set up menu (lowercase is for noJS)
	$('#menu a').each(function() {
		var capHref = '#'+$(this).attr('href').charAt(1).toUpperCase()+$(this).attr('href').slice(2);
		$(this).attr('href',capHref);
	});
	
	
	// Emai1 spam protection
	var domain = 'fionabarrattinteriors.com';
	$('#contact .info a').append('@'+domain);
	$('#contact .info a').attr('href', 'mai'+'lto:'+$('#contact .info a').attr('href').slice(1)+'@'+domain);
	
	
	// Backgrounds
	$('#backgrounds').cycle({
		fx: 'fade',
		timeout: 0,
		easeIn: 'easeInExpo',
		easeOut: 'easeOutExpo',
		speed: 500
	}).delay(200).fadeIn('fast', function() {
		
	// Initially navigate to the correct page
	showMainPage(newPage, subPage);
	});
	
	
	
	// Logo to home nav
	$('#logo').click(function() {
		$('#menu a[href=#Home]').click();
			window.location.hash = "Home";
	});
	
	
	
	/******************
	* Main Navigation *
	******************/
	
	$('#menu a').click(function() {
		// Remove any existing slideshow
		if (showIsActive == true) {
			$('#slideshowHolder').animate({'left':'568px','opacity':'0'},800,'easeInOutExpo',function() {
				$('#slideshowHolder').remove();
				$('#projects .submenu').css('z-index','200');
			});
			showIsActive = false;
		}
		
		oldPage = window.location.hash.toLowerCase();
		newPage = $(this).attr('href').toLowerCase();
		subPage = "";
		
		if (oldPage == newPage) {return false;}
		
		if (oldPage.indexOf('/') !=-1) {
			//*
			hashArr = oldPage.split('/');
			subPage = '#'+hashArr[1];
			oldPage = hashArr[0]; //*/
		}
		
		// Going from subpage to main page of same menu item
		if (oldPage == newPage && subPage != '') {
			newPage = oldPage + ' .mainContentPanel';
			hideSubPage(subPage, newPage);
		} else {
			// Going from main page or subpage to different menu item
			hideSubPage(subPage);
			subPage = '';
			hidePage(oldPage, newPage, subPage);
		}
		
	});
	
	/******************
	* Sub  Navigation *
	******************/
	
	$('.submenu a').click(function() {
		oldPage = window.location.hash.toLowerCase();
		newPage = $(this).attr('href').toLowerCase();
		if (oldPage == newPage) {return false;}
		
		// Test to see what content should be removed
		if (oldPage.indexOf('/') !=-1) {
			//*
			hashArr = oldPage.split('/');
			oldPage = '#'+hashArr[1]; //* /
		} else {
			oldPage += ' .mainContentPanel';
		}
		
		hashArr = newPage.split('/');
		subPage = '#'+hashArr[1];
		
		//console.log(oldPage, subPage);
		hideSubPage(oldPage, subPage);
	});
	
	/*********************
	* Slideshow Creation *
	*********************/
	
	var slideCount = {
		'no14':21,
		'thelodge':19,
		'apartmentchelsea':7,
		'townhousechelsea':20,
		'kensington':13,
		'stjohnswood':18,
		'swlondon':26
	}
	$('.contentPanel .showImages').click(function() {
		showIsActive = true;
		var slideshow = $(this).parent().parent().attr('id');
		$('#projects .submenu').css('z-index','50');
		$(this).parent().parent().parent().append('<div id="slideshowHolder"><img src="images/projects/slideshows/'+slideshow+'_sm.jpg" alt="" class="holder"><div id="pagerFrame"></div><div id="activeShow"></div></div>');
		$('#slideshowHolder').animate({'left':'368px','opacity':'1'},1000,'easeInOutExpo');
		$('#pagerFrame').html('<div id="pager"><ul id="pagerlist"></ul></div><div id="prev"></div><div id="next"></div><div id="close"></div>');
		$('#activeShow').html(createSlides(slideshow)).cycle({
			fx: 'fade',
			timeout: 0,
			requeueOnImageNotLoaded: false,
			nowrap: 1,
			pager: "#pagerlist",
			//pager: '#menu ul'
			pagerAnchorBuilder: function(idx, slide) { 
				return '<li><a href="#"><img src="' + slide.src + '" width="45" height="45" /></a></li>'; 
			}
		}).delay(1500).fadeIn(function() {
			$('.holder').fadeOut();
		});
		$('#prev').click(function() {
			if (parseInt($('#pager ul').css('top')) <= -53) {
				$('#pager ul').animate({'top':'+=53px'});
			}
			$('#activeShow').cycle('prev');
		});
		$('#next').click(function() {
			if (parseInt($('#pager ul').css('top')) >= $('#pager').height() - $('#pager ul').height() + 53) {
				$('#pager ul').animate({'top':'-=53px'});
			}
			$('#activeShow').cycle('next');
		});
		$('#close').click(function() {
			$('#slideshowHolder').animate({'left':'568px','opacity':'0'},800,'easeInOutExpo',function() {
				$('#slideshowHolder').remove();
				$('#projects .submenu').css('z-index','200');
			});
			showIsActive = false;
		});
	});
	
	function createSlides(slideshow) {
		var html = "";
		var showLength = slideCount[slideshow];
		for (i=1;i<=showLength;i++) {
			if (i <= 9) {var zero = "0";} else {zero = "";}
			html += "<img src='images/projects/slideshows/" + slideshow + "_" + zero + i + ".jpg' alt='' height='710' width='785'>";
		}
		return html;
	}
	
}); //End doc.ready








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
		if (revertSubPage == 1) {subPage = "";}
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
	$('#backgrounds').cycle(newBG);
	
	$(newSubPage).delay(400).animate({'left':'368px'});
}
//*/