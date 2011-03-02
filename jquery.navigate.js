/**
 * jQuery.navigate v 0.2 - 2nd March 2011
 * navigate.apio.ca
 * 
 * Copyright (c) 2010 Stuart Basden
 * Released under MIT license
 * https://github.com/jquery/jquery/blob/master/MIT-LICENSE.txt
 * 
 * ToDo: submenu entry, event creation, triple layer?
**/

// Console log debugger (remove)
if (!("console" in window) || !("firebug" in console)) {
	var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml", "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];
	window.console = {};
	for (var i = 0, len = names.length; i < len; ++i) {
		window.console[names[i]] = function(){};
	}
}

(function( $ ){
  $.fn.navigate = function( options ) {
		
		var settings = {
			'mainCycle' : {
				fx:'blindX',
				timeout:0
			}, // jQuery.cycle JSON settings. Remember timeout:0
			'subCycle'  : {
				fx:'blindY',
				timeout:0
			}, // jQuery.cycle JSON settings. Remember timeout:0
			'subpageContainer' : '.subpages', // Selector for container of subpages
			'instantLoad' : 0 // Set to 1 for the main page to appear initially without cycling
		};


		return this.each(function() {        
			// If options exist, lets merge them
			// with our default settings
			if ( options ) { 
				$.extend( settings, options );
			}
			
			
			settings.selector = $(this);
			settings.pageSlideNos = {};
			settings.subpageSlideNos = {};
			
			var home = '';
			
			var i = 0;
			// Get the pages 
			$(this).children().each(function() {
				var id = $(this).attr('id');
				//console.log(id); // Will log all pages IDs
				settings.pageSlideNos[id] = i;
				if (i == 0) {home = id;}
				i++;
				
				$(this).addClass('page');
			});
			console.log(settings['pageSlideNos']); // Will log the JSON
			
			
			// Start cycling the main pages
			$(this).cycle(settings['mainCycle']);
			
			
			// Show the initial slide (change to entry hash)
			if (window.location.hash == '') {
				window.location.hash = '#'+home.charAt(0).toUpperCase() + home.slice(1);
			}
			var pages = {
				'oldPage' : '',
				'newPage' : window.location.hash.toLowerCase(),
				'oldSubPage' : '',
				'newSubPage' : ''
			};
			if (pages.newPage.indexOf('/') !=-1) {					
				var hashArray = pages.newPage.split('/');
				pages.newPage = hashArray[0];
				pages.newSubPage = hashArray[1];
				//console.log(pages.newPage, pages.newSubPage);
			}
			navigate(settings, pages);
			
			// Force main page to appear instantly and not cycle in (not sure why this works)
			if (settings.instantLoad) {
				navigate(settings, pages);
			}		
			
			// Detect hash change and navigate
			$(window).hashchange( function(){
				pages = {
					'oldPage' : pages.newPage,
					'newPage' : window.location.hash.toLowerCase(),
					'oldSubPage' : pages.newSubPage,
					'newSubPage' : ''
				};
				if (pages.newPage.indexOf('/') !=-1) {					
					var hashArray = pages.newPage.split('/');
					pages.newPage = hashArray[0];
					pages.newSubPage = hashArray[1];
				}
				//console.log(pages);
				navigate(settings, pages);
			});
			
			
			$('a').click(settings,function() {
				
				if ($(this).attr('href').charAt(0) == '#') {
					
					// Set variables
					var link = $(this).attr('href');
					
					
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




function navigate(settings, pages) {
	if (pages.oldPage != pages.newPage) {
		console.log('main cycle required');
		
		// Go to page
		var slide = settings.pageSlideNos[pages.newPage.replace('#','')];
		settings.selector.cycle(slide);

		// Create subpage cycle
		if ($(pages.newPage).children(settings['subpageContainer']).length != 0) {
			$(pages.newPage).children(settings['subpageContainer']).cycle(settings['subCycle']).addClass('cycling');
			
			// Get the subpages index
			var j = 0;
			$(pages.newPage).children(settings['subpageContainer']).children().each(function() {
				var id = $(this).attr('id');
				//console.log(id); // Will log all pages IDs
				settings.subpageSlideNos[id] = j;
				j++;

				$(this).addClass('subpage');
			});
			//console.log(settings['subpageSlideNos']); // Will log the JSON

		}
		
		
		// Go to subpage
		if (pages.newSubPage != '') {
			goToSubPage(settings, pages);
		}
		
		
		// Destroy oldpage subpage cycle
		if ($(pages.oldPage).children(settings['subpageContainer']).length != 0) {
			$(pages.oldPage+' '+settings['subpageContainer']).cycle('destroy');
		}
		
		
		
		
	} else {
		console.log('no main cycle');
		if (pages.newSubPage == '') {
			// Go to first slide
			$(pages.newPage).children(settings['subpageContainer']).cycle(0);
		} else {
			goToSubPage(settings, pages);
		}
	}
}

function goToSubPage(settings, pages) {
	var subslide = settings.subpageSlideNos[pages.newSubPage];
	$(pages.newPage).children(settings['subpageContainer']).cycle(subslide);
}


/*
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,e,b){var c="hashchange",h=document,f,g=$.event.special,i=h.documentMode,d="on"+c in e&&(i===b||i>7);function a(j){j=j||location.href;return"#"+j.replace(/^[^#]*#?(.*)$/,"$1")}$.fn[c]=function(j){return j?this.bind(c,j):this.trigger(c)};$.fn[c].delay=50;g[c]=$.extend(g[c],{setup:function(){if(d){return false}$(f.start)},teardown:function(){if(d){return false}$(f.stop)}});f=(function(){var j={},p,m=a(),k=function(q){return q},l=k,o=k;j.start=function(){p||n()};j.stop=function(){p&&clearTimeout(p);p=b};function n(){var r=a(),q=o(m);if(r!==m){l(m=r,q);$(e).trigger(c)}else{if(q!==m){location.href=location.href.replace(/#.*/,"")+q}}p=setTimeout(n,$.fn[c].delay)}$.browser.msie&&!d&&(function(){var q,r;j.start=function(){if(!q){r=$.fn[c].src;r=r&&r+a();q=$('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){r||l(a());n()}).attr("src",r||"javascript:0").insertAfter("body")[0].contentWindow;h.onpropertychange=function(){try{if(event.propertyName==="title"){q.document.title=h.title}}catch(s){}}}};j.stop=k;o=function(){return a(q.location.href)};l=function(v,s){var u=q.document,t=$.fn[c].domain;if(v!==s){u.title=h.title;u.open();t&&u.write('<script>document.domain="'+t+'"<\/script>');u.close();q.location.hash=v}}})();return j})()})(jQuery,this);
